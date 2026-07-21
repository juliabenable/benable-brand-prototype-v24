import { Fragment } from 'react';
import '../styles/content-study.css';
import '../styles/second-campaign-study.css';
import '../styles/second-campaign-stages.css';

/**
 * Design study — the second-campaign banner as a LIFECYCLE.
 * Chosen directions: D (drafted-for-you) as the resident main-screen banner,
 * G (takeover) as the one-time reveal when it unlocks.
 *
 * The idea: the hero slot on the campaigns screen always holds "your next
 * campaign" as a draft TICKET that visibly assembles itself while the current
 * campaign runs (expectation), then unlocks with a celebratory takeover and
 * asks for the launch (incitement), then warms/cools if the brand waits.
 */

const AVS = [
  ['M', '#4a3f9e'],
  ['S', '#b3487c'],
  ['A', '#2e7d54'],
  ['J', '#b3611f'],
];

function TicketAvs({ filled, empty }) {
  return (
    <div className="scst-ticket__avs">
      {AVS.slice(0, filled).map(([ini, bg]) => (
        <span key={ini} className="scst-ticket__av" style={{ background: bg }}>{ini}</span>
      ))}
      {[...Array(empty)].map((_, i) => (
        <span key={i} className="scst-ticket__av scst-ticket__av--empty">·</span>
      ))}
    </div>
  );
}

/* The evolving draft ticket. stage: 1 gathering · 2 shaping · 3 ready · 5 cooled */
function Ticket({ stage, className = '' }) {
  const ready = stage === 3;
  const cls = [
    'scst-ticket',
    stage === 1 && 'scst-ticket--ghost',
    stage === 5 && 'scst-ticket--dim',
    ready && 'scst-ticket--ready',
    className,
  ].filter(Boolean).join(' ');
  return (
    <div className={cls}>
      <div className="scst-ticket__tag">
        {ready ? <span className="scst-ticket__ready">READY</span> : 'Next campaign · draft'}
      </div>
      <div className={`scst-ticket__name${stage === 1 ? ' scst-ticket__name--tbd' : ''}`}>
        {stage === 1 ? 'Taking shape…' : 'Summer Glow'}
      </div>
      <div className="scst-ticket__rows">
        <div className="scst-ticket__row">
          <span className="ic">👥</span>
          {stage === 1 && <TicketAvs filled={1} empty={3} />}
          {stage === 2 && <TicketAvs filled={3} empty={1} />}
          {(stage === 3 || stage === 5) && <><TicketAvs filled={4} empty={0} /><span>+2 new fits</span></>}
        </div>
        <div className={`scst-ticket__row${stage === 1 ? ' scst-ticket__row--empty' : ''}`}>
          <span className="ic">✍️</span>
          {stage === 1 ? <span className="scst-ticket__slot" /> : <span>Angles from your top posts</span>}
        </div>
        <div className={`scst-ticket__row${stage < 3 ? ' scst-ticket__row--empty' : ''}`}>
          <span className="ic">🗓</span>
          {stage === 1 && <span className="scst-ticket__slot" />}
          {stage === 2 && <span className="scst-ticket__slot" />}
          {stage === 3 && <span>Suggested launch: Aug 4</span>}
          {stage === 5 && <span>Launch: whenever you’re ready</span>}
        </div>
      </div>
      {stage < 3 && <span className="scst-ticket__lock">🔒 Unlocks at wrap</span>}
    </div>
  );
}

/* Main-screen frame: header + hero slot + campaigns table ghost */
function Screen({ hero }) {
  return (
    <div className="scst-screen">
      <div className="scst-screen__head">
        <span className="scst-screen__logo" />
        <span className="scst-screen__brand">Benable</span>
        <span className="scst-screen__nav"><b>Campaigns</b><span>UGC Studio</span><span>Push Alerts</span></span>
      </div>
      {hero}
      <div className="scst-table">
        <div className="scst-table__t">Campaigns</div>
        <div className="scst-trow"><span style={{ width: 160 }} /><span className="scst-pill">ACTIVE</span></div>
        <div className="scst-trow"><span style={{ width: 120 }} /><span className="scst-pill" style={{ background: '#efecf9', color: '#6a5acd' }}>WRAPPED</span></div>
      </div>
    </div>
  );
}

function Cta({ children, ghost, onDark }) {
  const cls = `scs-cta${ghost ? ' scs-cta--ghost' : ''}${onDark ? ' scs-cta--ondark' : ''}`;
  return (
    <button type="button" className={cls}>
      {children}<span className="scs-cta__arr" aria-hidden="true">→</span>
    </button>
  );
}

/* ── Stage 1 · gathering (mid-campaign) ── */
const Stage1 = () => (
  <div className="scst-hero">
    <div className="scst-hero__copy">
      <div className="scst-hero__kicker"><span className="dot dot--live" />Assembling from live results</div>
      <div className="scst-hero__t">Your next campaign is writing itself</div>
      <div className="scst-hero__d">
        While Spring Glow runs, we’re noting what works — creators who deliver,
        angles people respond to. It all lands in this draft.
      </div>
      <div className="scst-hero__actions">
        <span className="scst-hero__hint">1 creator flagged as a strong fit so far · updates as results come in</span>
      </div>
    </div>
    <Ticket stage={1} />
  </div>
);

/* ── Stage 2 · taking shape (campaign wrapping) ── */
const Stage2 = () => (
  <div className="scst-hero">
    <div className="scst-hero__copy">
      <div className="scst-hero__kicker"><span className="dot" />Almost ready</div>
      <div className="scst-hero__t">Your draft unlocks when Spring Glow wraps</div>
      <div className="scst-hero__d">
        Three creators shortlisted, angles pulled from your top posts.
        The full draft opens with your wrap-up — about a week out.
      </div>
      <div className="scst-hero__actions">
        <Cta ghost>Peek at the shortlist</Cta>
        <span className="scst-hero__hint">Unlocks ~Jul 28</span>
      </div>
    </div>
    <Ticket stage={2} />
  </div>
);

/* ── Stage 3 · it's time (draft ready) ── */
const Stage3 = () => (
  <div className="scst-hero">
    <div className="scst-hero__copy">
      <div className="scst-hero__kicker"><span className="dot" />It’s time</div>
      <div className="scst-hero__t">Summer Glow is ready to launch ✨</div>
      <div className="scst-hero__d">
        Built from everything Spring Glow taught us — your four best creators
        said yes to going again. Review it, tweak anything, launch this week.
      </div>
      <div className="scst-hero__actions">
        <Cta>Review the draft</Cta>
        <Cta ghost>Start from scratch</Cta>
      </div>
    </div>
    <Ticket stage={3} />
  </div>
);

/* ── Stage 4 · warm window (no action, 1–2 weeks) ── */
const Stage4 = () => (
  <div className="scst-hero scst-hero--warm">
    <div className="scst-hero__copy">
      <div className="scst-hero__kicker"><span className="dot" />Momentum window</div>
      <div className="scst-hero__t">Your audience is still warm</div>
      <div className="scst-hero__d">
        Spring Glow posts are still being seen and saved. Launching Summer Glow
        while the feed is warm compounds that reach instead of restarting it.
      </div>
      <div className="scst-warmstrip">
        <div className="scs-meter"><span className="scs-meter__dot" style={{ left: '30%' }} /></div>
        <small>~2 weeks left</small>
      </div>
      <div className="scst-hero__actions">
        <Cta>Launch Summer Glow</Cta>
        <span className="scst-hero__hint">Draft’s ready — 2 minutes to send</span>
      </div>
    </div>
    <Ticket stage={3} />
  </div>
);

/* ── Stage 5 · cooled (3+ weeks) ── */
const Stage5 = () => (
  <div className="scst-hero scst-hero--cool">
    <div className="scst-hero__copy">
      <div className="scst-hero__kicker"><span className="dot" />Whenever you’re ready</div>
      <div className="scst-hero__t">Summer Glow is saved for you</div>
      <div className="scst-hero__d">
        No rush — your draft keeps. When you’re ready, we’ll refresh the creator
        list and angles so it launches current, not stale. Fall planning starts
        soon, if you want a natural moment.
      </div>
      <div className="scst-hero__actions">
        <Cta ghost>Refresh &amp; review</Cta>
        <span className="scst-hero__hint">Katie can also set it up — just reply to her note</span>
      </div>
    </div>
    <Ticket stage={5} />
  </div>
);

/* ── The one-time unlock takeover (G), between stages 2 → 3 ── */
const BURSTS = [
  ['8%', '10%', '🎉'], ['12%', '84%', '✨'], ['80%', '14%', '✨'],
  ['74%', '88%', '🎊'], ['4%', '48%', '·'],
];
const UnlockTakeover = () => (
  <div className="scs-takeover">
    <div className="scs-takeover__ghost" aria-hidden="true" />
    <div className="scs-takeover__card">
      {BURSTS.map(([top, left, ch], i) => (
        <span key={i} className="scs-takeover__burst" style={{ top, left }} aria-hidden="true">{ch}</span>
      ))}
      <div className="scs-takeover__kicker">Your draft just unlocked</div>
      <h3>Summer Glow is ready.</h3>
      <Ticket stage={3} className="scst-reveal-ticket" />
      <p>
        The campaign you watched assemble all month is good to go —
        four returning creators, angles from your best posts.
      </p>
      <Cta onDark>Open it</Cta>
      <button type="button" className="scs-takeover__later">I’ll look on my dashboard</button>
    </div>
  </div>
);

function Study({ id, title, desc, children }) {
  return (
    <section className="cst-study">
      <div className="cst-study__label"><span className="cst-study__id">{id}</span><b>{title}</b><small>{desc}</small></div>
      {children}
    </section>
  );
}

const RAIL = [
  ['1', 'Gathering', 'Campaign live. Ticket assembles from results — quiet, no ask.'],
  ['2', 'Taking shape', 'Wrap approaching. Shortlist visible, launch details locked.'],
  ['★', 'Unlock', 'Wrap done. One-time takeover reveals the finished draft.', true],
  ['3', 'It’s time', 'Hero flips to the full ask: review & launch.'],
  ['4', 'Warm window', 'No action after ~1wk: momentum framing, gentle urgency.'],
  ['5', 'Cooled', 'After ~3wks: pressure off, draft keeps, refresh offered.'],
];

export default function SecondCampaignStagesStudy() {
  return (
    <div className="cst">
      <header className="cst-top">
        <span className="cst-top__kicker">Benable · Brand Portal · Main screen</span>
        <h1>The next-campaign banner, staged</h1>
        <p>
          D + G, turned into a lifecycle for the campaigns-screen hero slot. One persistent
          object — the <b>draft ticket</b> — visibly assembles itself while the current campaign
          runs (<b>build expectation</b>), unlocks with a one-time takeover at wrap
          (<b>the moment</b>), then asks for the launch with escalating-then-relaxing framing
          (<b>incite, don’t nag</b>). The brand watches their next campaign get built before
          they can even buy it.
        </p>
        <div className="scst-rail">
          {RAIL.map(([n, t, d, hot], i) => (
            <Fragment key={t}>
              {i > 0 && <span className="scst-rail__link" />}
              <div className="scst-rail__node">
                <div className={`scst-rail__dot${hot ? ' scst-rail__dot--hot' : ''}`}>{n}</div>
                <div className="scst-rail__t">{t}</div>
                <div className="scst-rail__d">{d}</div>
              </div>
            </Fragment>
          ))}
        </div>
      </header>

      <Study id="1" title="Gathering" desc="Mid-campaign — they can't start yet, and we don't ask. The ticket exists, mostly empty, filling from live results. Trigger: campaign active.">
        <Screen hero={<Stage1 />} />
      </Study>

      <Study id="2" title="Taking shape" desc="Wrap approaching — shortlist shows, launch details stay locked. Anticipation, still no purchase ask. Trigger: last ~week of campaign.">
        <Screen hero={<Stage2 />} />
      </Study>

      <Study id="★" title="The unlock (G, once)" desc="First visit after wrap: the ticket they watched fill is revealed complete. Fires exactly once, then never again. Trigger: first session post-wrap.">
        <UnlockTakeover />
      </Study>

      <Study id="3" title="It's time" desc="The hero flips to the full D ask — draft ready, returning creators, launch this week. Trigger: post-unlock, weeks 0–1.">
        <Screen hero={<Stage3 />} />
      </Study>

      <Study id="4" title="Warm window" desc="No action after ~a week: add the momentum meter and a soft deadline. Warmer palette, gentle urgency — never a discount countdown. Trigger: weeks 1–3.">
        <Screen hero={<Stage4 />} />
      </Study>

      <Study id="5" title="Cooled" desc="After ~3 weeks the pressure comes OFF: draft keeps, we offer to refresh it, Katie option surfaces. Respectful beats naggy. Trigger: week 3+.">
        <Screen hero={<Stage5 />} />
      </Study>

      <footer className="cst-foot">
        One banner, one slot, six states. The ticket is the through-line — it earns the takeover
        because they watched it get built. Tell me if the stage triggers feel right and I’ll build
        the staged banner into the campaigns screen for real.
      </footer>
    </div>
  );
}
