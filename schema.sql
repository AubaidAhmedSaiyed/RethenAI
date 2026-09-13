DROP TABLE IF EXISTS waitlist;
CREATE TABLE waitlist (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL,
  company TEXT NOT NULL,
  building TEXT NOT NULL,
  hardest TEXT,
  submitted_at TEXT NOT NULL
);
