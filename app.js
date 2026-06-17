const friendCountries = [
  "Spain",
  "Germany",
  "England",
  "Portugal",
  "Mexico",
  "Netherlands",
];

const matches = [
  {
    date: "2026-06-11",
    time: "1:00 PM local",
    kickoff: "2026-06-11T13:00:00-06:00",
    group: "Group A",
    home: "Mexico",
    away: "South Africa",
    venue: "Mexico City Stadium",
  },
  {
    date: "2026-06-14",
    time: "12:00 PM local",
    kickoff: "2026-06-14T12:00:00-05:00",
    group: "Group E",
    home: "Germany",
    away: "Curacao",
    venue: "Houston Stadium",
  },
  {
    date: "2026-06-14",
    time: "3:00 PM local",
    kickoff: "2026-06-14T15:00:00-05:00",
    group: "Group F",
    home: "Netherlands",
    away: "Japan",
    venue: "Dallas Stadium",
  },
  {
    date: "2026-06-15",
    time: "12:00 PM local",
    kickoff: "2026-06-15T12:00:00-04:00",
    group: "Group H",
    home: "Spain",
    away: "Cabo Verde",
    venue: "Atlanta Stadium",
  },
  {
    date: "2026-06-17",
    time: "3:00 PM local",
    kickoff: "2026-06-17T15:00:00-05:00",
    group: "Group L",
    home: "England",
    away: "Croatia",
    venue: "Dallas Stadium",
  },
  {
    date: "2026-06-17",
    time: "12:00 PM local",
    kickoff: "2026-06-17T12:00:00-05:00",
    group: "Group K",
    home: "Portugal",
    away: "Congo DR",
    venue: "Houston Stadium",
  },
  {
    date: "2026-06-18",
    time: "7:00 PM local",
    kickoff: "2026-06-18T19:00:00-06:00",
    group: "Group A",
    home: "Mexico",
    away: "Korea Republic",
    venue: "Estadio Guadalajara",
  },
  {
    date: "2026-06-20",
    time: "4:00 PM local",
    kickoff: "2026-06-20T16:00:00-04:00",
    group: "Group E",
    home: "Germany",
    away: "Cote d'Ivoire",
    venue: "Toronto Stadium",
  },
  {
    date: "2026-06-20",
    time: "12:00 PM local",
    kickoff: "2026-06-20T12:00:00-05:00",
    group: "Group F",
    home: "Netherlands",
    away: "Sweden",
    venue: "Houston Stadium",
  },
  {
    date: "2026-06-21",
    time: "12:00 PM local",
    kickoff: "2026-06-21T12:00:00-04:00",
    group: "Group H",
    home: "Spain",
    away: "Saudi Arabia",
    venue: "Atlanta Stadium",
  },
  {
    date: "2026-06-23",
    time: "4:00 PM local",
    kickoff: "2026-06-23T16:00:00-04:00",
    group: "Group L",
    home: "England",
    away: "Ghana",
    venue: "Boston Stadium",
  },
  {
    date: "2026-06-23",
    time: "12:00 PM local",
    kickoff: "2026-06-23T12:00:00-05:00",
    group: "Group K",
    home: "Portugal",
    away: "Uzbekistan",
    venue: "Houston Stadium",
  },
  {
    date: "2026-06-24",
    time: "7:00 PM local",
    kickoff: "2026-06-24T19:00:00-06:00",
    group: "Group A",
    home: "Czechia",
    away: "Mexico",
    venue: "Mexico City Stadium",
  },
  {
    date: "2026-06-25",
    time: "4:00 PM local",
    kickoff: "2026-06-25T16:00:00-04:00",
    group: "Group E",
    home: "Ecuador",
    away: "Germany",
    venue: "New York New Jersey Stadium",
  },
  {
    date: "2026-06-25",
    time: "6:00 PM local",
    kickoff: "2026-06-25T18:00:00-05:00",
    group: "Group F",
    home: "Tunisia",
    away: "Netherlands",
    venue: "Kansas City Stadium",
  },
  {
    date: "2026-06-26",
    time: "6:00 PM local",
    kickoff: "2026-06-26T18:00:00-06:00",
    group: "Group H",
    home: "Uruguay",
    away: "Spain",
    venue: "Estadio Guadalajara",
  },
  {
    date: "2026-06-27",
    time: "5:00 PM local",
    kickoff: "2026-06-27T17:00:00-04:00",
    group: "Group L",
    home: "Panama",
    away: "England",
    venue: "New York New Jersey Stadium",
  },
];

const matchDurationMs = 135 * 60 * 1000;

let selectedCountry = "all";
let selectedMatchId = "";

const countryFilter = document.querySelector("#countryFilter");
const countryButtons = document.querySelector("#countryButtons");
const matchList = document.querySelector("#matchList");
const matchCount = document.querySelector("#matchCount");
const calendarGrid = document.querySelector("#calendarGrid");
const calendarSummary = document.querySelector("#calendarSummary");
const nextMatchTeams = document.querySelector("#nextMatchTeams");
const nextMatchMeta = document.querySelector("#nextMatchMeta");
const nextMatchButton = document.querySelector("#nextMatchButton");
const nextMatchLabel = document.querySelector("#nextMatchLabel");
const liveIndicator = document.querySelector("#liveIndicator");
const template = document.querySelector("#matchCardTemplate");

function setupCountryControls() {
  friendCountries.forEach((country) => {
    const option = document.createElement("option");
    option.value = country;
    option.textContent = country;
    countryFilter.append(option);

    const button = document.createElement("button");
    button.className = "country-button";
    button.type = "button";
    button.textContent = country;
    button.addEventListener("click", () => {
      selectedCountry = selectedCountry === country ? "all" : country;
      countryFilter.value = selectedCountry;
      renderMatches();
    });
    countryButtons.append(button);
  });
}

function matchIncludesCountry(match, country) {
  return match.home === country || match.away === country;
}

function getMatchId(match) {
  return `${match.kickoff}-${match.home}-${match.away}`;
}

function getMatchEndTime(match) {
  return new Date(new Date(match.kickoff).getTime() + matchDurationMs);
}

function isMatchLive(match) {
  const now = new Date();
  const kickoff = new Date(match.kickoff);
  const fullTime = getMatchEndTime(match);

  return kickoff <= now && now < fullTime;
}

function isMatchStillRelevant(match) {
  return getMatchEndTime(match) > new Date();
}

function getFilteredMatches() {
  return matches.filter((match) => {
    const isVisibleCountry =
      selectedCountry === "all"
        ? friendCountries.some((country) => matchIncludesCountry(match, country))
        : matchIncludesCountry(match, selectedCountry);

    return isVisibleCountry && isMatchStillRelevant(match);
  }).sort((firstMatch, secondMatch) => {
    return new Date(firstMatch.kickoff) - new Date(secondMatch.kickoff);
  });
}

function getFriendMatches() {
  return matches.filter((match) => {
    return (
      friendCountries.some((country) => matchIncludesCountry(match, country)) &&
      isMatchStillRelevant(match)
    );
  }).sort((firstMatch, secondMatch) => {
    return new Date(firstMatch.kickoff) - new Date(secondMatch.kickoff);
  });
}

function getFeaturedMatch() {
  const friendMatches = getFriendMatches();
  const liveMatch = friendMatches.find(isMatchLive);

  return liveMatch || friendMatches[0];
}

function formatDateParts(kickoffValue) {
  const date = new Date(kickoffValue);

  return {
    month: date.toLocaleDateString("en-US", { month: "short" }),
    day: date.toLocaleDateString("en-US", { day: "2-digit" }),
    fullDate: date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    }),
  };
}

function formatWatchPartyTime(kickoffValue) {
  const date = new Date(kickoffValue);

  return date.toLocaleString([], {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  });
}

function getDayNumber(kickoffValue) {
  const date = new Date(kickoffValue);
  return Number(
    date.toLocaleDateString("en-CA", {
      day: "numeric",
    }),
  );
}

function formatCalendarTime(kickoffValue) {
  const date = new Date(kickoffValue);

  return date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
}

function getReminderText(match) {
  if (isMatchLive(match)) {
    return `Live now: ${match.home} vs ${match.away}. Turn it on if you are watching with the group. Venue: ${match.venue}.`;
  }

  return `Next World Cup watch party: ${match.home} vs ${match.away}, ${formatWatchPartyTime(match.kickoff)}. Venue: ${match.venue}.`;
}

async function copyText(text) {
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.top = "-999px";
  document.body.append(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

function renderNextMatch() {
  const featuredMatch = getFeaturedMatch();

  if (!featuredMatch) {
    nextMatchLabel.textContent = "Schedule Complete";
    liveIndicator.hidden = true;
    nextMatchTeams.textContent = "No live or upcoming matches";
    nextMatchMeta.textContent = "The friend-group schedule has finished.";
    nextMatchButton.disabled = true;
    return;
  }

  const matchIsLive = isMatchLive(featuredMatch);

  nextMatchLabel.textContent = matchIsLive ? "Live Now" : "Next Match";
  liveIndicator.hidden = !matchIsLive;
  nextMatchTeams.textContent = `${featuredMatch.home} vs ${featuredMatch.away}`;
  nextMatchMeta.textContent = matchIsLive
    ? `Currently live - kicked off ${formatWatchPartyTime(featuredMatch.kickoff)} your time - ${featuredMatch.group} - ${featuredMatch.venue}`
    : `${formatWatchPartyTime(featuredMatch.kickoff)} your time - ${featuredMatch.group} - ${featuredMatch.venue}`;
  nextMatchButton.disabled = false;
  nextMatchButton.dataset.matchId = getMatchId(featuredMatch);
}

function renderCalendar(filteredMatches) {
  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const daysInJune = 30;
  const firstWeekdayIndex = 0;
  const matchesByDay = new Map();

  filteredMatches.forEach((match) => {
    const day = getDayNumber(match.kickoff);
    const dayMatches = matchesByDay.get(day) || [];
    dayMatches.push(match);
    matchesByDay.set(day, dayMatches);
  });

  calendarGrid.innerHTML = "";
  calendarSummary.textContent =
    matchesByDay.size === 1
      ? "1 match day"
      : `${matchesByDay.size} match days`;

  weekdays.forEach((weekday) => {
    const label = document.createElement("div");
    label.className = "weekday";
    label.textContent = weekday;
    calendarGrid.append(label);
  });

  for (let index = 0; index < firstWeekdayIndex; index += 1) {
    const emptyDay = document.createElement("div");
    emptyDay.className = "calendar-day empty";
    calendarGrid.append(emptyDay);
  }

  for (let day = 1; day <= daysInJune; day += 1) {
    const dayMatches = matchesByDay.get(day) || [];
    const dayCell = document.createElement("div");
    dayCell.className =
      dayMatches.length > 0 ? "calendar-day has-match" : "calendar-day";

    const dayNumber = document.createElement("span");
    dayNumber.className = "calendar-day-number";
    dayNumber.textContent = day;
    dayCell.append(dayNumber);

    const events = document.createElement("div");
    events.className = "calendar-events";

    dayMatches.forEach((match) => {
      const event = document.createElement("div");
      const matchId = getMatchId(match);
      event.className =
        matchId === selectedMatchId
          ? "calendar-event selected"
          : "calendar-event";
      event.dataset.matchId = matchId;
      event.textContent = `${formatCalendarTime(match.kickoff)} ${match.home} vs ${match.away}`;
      event.addEventListener("click", () => {
        selectedMatchId = matchId;
        renderMatches();
      });
      events.append(event);
    });

    dayCell.append(events);
    calendarGrid.append(dayCell);
  }
}

function renderMatches() {
  const filteredMatches = getFilteredMatches();

  matchList.innerHTML = "";
  renderNextMatch();
  renderCalendar(filteredMatches);
  matchCount.textContent =
    filteredMatches.length === 1
      ? "1 match"
      : `${filteredMatches.length} matches`;

  document.querySelectorAll(".country-button").forEach((button) => {
    button.classList.toggle("active", button.textContent === selectedCountry);
  });

  if (filteredMatches.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "No live or upcoming matches found for this country.";
    matchList.append(empty);
    return;
  }

  filteredMatches.forEach((match) => {
    const card = template.content.cloneNode(true);
    const article = card.querySelector(".match-card");
    const matchId = getMatchId(match);
    const date = formatDateParts(match.kickoff);
    const watchPartyTime = formatWatchPartyTime(match.kickoff);

    article.classList.toggle("selected", matchId === selectedMatchId);
    article.dataset.matchId = matchId;
    article.tabIndex = 0;
    article.setAttribute("role", "button");
    article.setAttribute("aria-pressed", String(matchId === selectedMatchId));
    article.addEventListener("click", () => {
      selectedMatchId = matchId;
      renderMatches();
    });
    article.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectedMatchId = matchId;
        renderMatches();
      }
    });

    card.querySelector(".month").textContent = date.month;
    card.querySelector(".day").textContent = date.day;
    card.querySelector(".teams").textContent = `${match.home} vs ${match.away}`;
    card.querySelector(
      ".meta",
    ).textContent = `${watchPartyTime} your time - ${match.time} - ${match.group} - ${match.venue}`;

    matchList.append(card);
  });
}

countryFilter.addEventListener("change", () => {
  selectedCountry = countryFilter.value;
  renderMatches();
});

nextMatchButton.addEventListener("click", async () => {
  const nextMatch = getFeaturedMatch();

  if (!nextMatch) {
    return;
  }

  await copyText(getReminderText(nextMatch));
  nextMatchButton.textContent = "Copied";

  window.setTimeout(() => {
    nextMatchButton.textContent = "Copy Reminder";
  }, 1600);
});

setupCountryControls();
renderMatches();
