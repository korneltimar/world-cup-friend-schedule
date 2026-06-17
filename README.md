# World Cup Friend Schedule

This is a small beginner-friendly web app for showing 2026 World Cup matches
for countries your friend group cares about.

## How to Open It

Open `index.html` in a browser.

## How It Works

- `index.html` contains the page structure.
- `styles.css` controls the layout, colors, and spacing.
- `app.js` contains the country list, match list, and filtering logic.

## How to Customize It

In `app.js`, edit the `friendCountries` array to match your friend group.

```js
const friendCountries = ["Australia", "England", "Mexico", "USA"];
```

To add or update fixtures, edit the `matches` array.

```js
{
  date: "2026-06-11",
  time: "1:00 PM local",
  kickoff: "2026-06-11T13:00:00-06:00",
  group: "Group A",
  home: "Mexico",
  away: "South Africa",
  venue: "Mexico City Stadium",
}
```

The `time` value is the stadium-local kickoff time. The `kickoff` value is an
exact timestamp with a UTC offset, which lets the app show each viewer the match
time in their own timezone.

This first version stores the data directly in the app so you can understand
the whole thing before adding databases, APIs, or user accounts.

## Fixture Data Note

The current group-stage fixture data was copied into `app.js` from public 2026
World Cup schedule listings.
