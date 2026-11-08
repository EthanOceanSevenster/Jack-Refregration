# Jack Cool

Website and callout enquiries for a refrigeration, aircon and heat pump
business in Centurion. Built and hosted by Orbit Software.

Two halves:

- `frontend/` — Next.js. The public website. This is what is deployed.
- `backend/` — Django. Takes callout requests, stores them, emails Jack.

A repair business lives on the phone, so the site leads with calling. The
form is for people who find the site after hours and do not want to leave a
voicemail. Every enquiry is stored before any email is attempted, so a mail
problem can never lose a job.

## Pages

| Route | What it is |
| --- | --- |
| `/` | Front door: what he does, the work, how a callout goes, areas, questions |
| `/services` | The five trades, each with its own page |
| `/services/[slug]` | Aircon, heat pumps, cold rooms, freezer rooms, fridges and freezers |
| `/maintenance` | Servicing: why, what is checked, how often |
| `/our-work` | His own photographs, filterable by trade |
| `/areas` | The six areas, with a line on each |
| `/faq` | What people ring up to ask before they book |
| `/contact` | Phone, WhatsApp, and the callout form |

## Running it

```
cd backend
python -m venv .venv
.venv\Scripts\pip install -r requirements.txt
.venv\Scripts\python manage.py migrate
.venv\Scripts\python manage.py runserver 8100

cd frontend
npm install
npm run dev          # http://localhost:3200
```

## Deploying the site

The frontend deploys to Vercel on its own. Set the project root to
`frontend/`; everything else is default.

Environment variables on Vercel:

| Name | Value | Why |
| --- | --- | --- |
| `NEXT_PUBLIC_CALLOUT_MODE` | `whatsapp` | No Django yet, so the form hands the details to WhatsApp on his number instead of posting them into nothing. Set it to `api` the day the backend is hosted. |
| `API_URL` | the Django URL | Only once the backend is hosted. |

Nothing else is needed: the site is static apart from the form, and every
photograph is in the repo.

## What Jack still has to give us

- An email address, so callouts can be mailed to him
- SAQCC Gas registration number, if he has one, and years in the trade
- Any warranty he gives on a repair
- Two or three customer quotes, or his Google Business Profile link
- Whether there is a callout fee, and what he accepts as payment

Nothing on the site is invented. No years in business, no review counts, no
prices and no brand names he has not confirmed.
