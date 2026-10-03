# Student Wellbeing Support
## From Help-Seeking Research to a Service Discovery MVP

A team project exploring how students discover wellbeing support and decide whether to seek help. Across three iterations, we moved from interviews and hypothesis testing to a web prototype combining self-help resources, a conversational guidance interface, and a Service Explorer.

My main contribution connected research with implementation: I conducted interviews, analysed help-seeking barriers, contributed to hypothesis testing and competitor analysis, developed the Service Explorer, and evaluated the prototype with users.

| Type | Roles | Tools | Status |
| --- | --- | --- | --- |
| Team project · UX research & web prototype | User Researcher, Analyst, Service Explorer Developer | HTML, CSS, JavaScript, Google Maps JavaScript API, Git | Completed academic MVP · evaluated through user testing |

## The Problem

Knowing that support exists does not necessarily make it easy to use. Students in our interviews described limited awareness of available services, a preference for managing stress independently, and hesitation caused by stigma, scheduling difficulties, and uncertainty about costs.

The design opportunity was to make the first step clearer: help students understand what a service offers, whether it is affordable, and how to find it, while allowing them to explore self-help resources first.

## My Contribution

| Area | My contribution |
| --- | --- |
| User research | Conducted seven initial interviews, five follow-up interviews, and two prototype evaluation sessions. These are session counts across iterations; they do not imply fourteen unique participants. |
| Research analysis | Used open coding, category development, and thematic synthesis to identify recurring barriers and support preferences. Produced individual interview summaries and a feedback matrix. |
| Hypothesis testing | Contributed to research questions, test cards, and learning cards that connected assumptions with interview evidence. |
| Competitor analysis | Analysed an existing online therapy platform through a business model canvas, considering flexible access, pricing, and limitations for student needs. |
| MVP development | Developed the Service Explorer module, presenting service content, costs, and locations through filters, result cards, and an interactive map. |
| Prototype evaluation | Summarised two users’ feedback on service discovery, navigation, interaction feedback, and chatbot limitations, identifying priorities for further refinement. |

The homepage, login interface, chatbot, and self-help module were developed collaboratively by other team members. They provide the surrounding experience for my service discovery work.

## Iteration 1 — Understanding Help-Seeking Barriers

The team began with four assumptions: students may lack awareness of support, prefer self-management before professional help, experience pressure during busy academic periods, and need clearer information about services and costs.

The first iteration documented 28 team interviews. My seven interviews explored awareness, coping strategies, reasons for hesitation, and expectations of a support tool.

I analysed transcripts in three steps:

1. Identified initial codes, including unfamiliarity with services, self-reliance, embarrassment, time conflicts, and requests for clearer information.
2. Grouped codes into broader categories: awareness and accessibility, help-seeking barriers, stress triggers, coping strategies, and preferred support.
3. Synthesised themes that could inform design decisions.

A recurring insight was that showing a location alone would not resolve uncertainty. Students also wanted to know what help they could receive and whether it would cost money. This became the basis for the Service Explorer.

## Iteration 2 — Prioritising a Useful First Step

The second iteration documented 20 team interviews. My five follow-up interviews explored potential approaches: promotion through familiar digital channels, self-help and conversational support, timetable integration, incentives, and clearer service information.

My analysis highlighted three decisions:

- **Make service content and cost visible.** Students needed enough information to judge relevance and affordability before approaching a provider.
- **Treat self-help as an optional entry point.** Participants were interested in independent support, while raising concerns about privacy and the limits of automated conversations.
- **Keep convenience features under user control.** Timetable sharing received mixed responses, and incentives were less important than the usefulness of the service itself.

The team’s learning card recorded that 14 of 20 interviewees prioritised service content and cost over location. This supported making transparent service information a core MVP feature. The finding describes this interview sample, rather than the wider student population.

I also analysed an online therapy platform to examine how flexible access and pricing were communicated. This helped frame the project’s emphasis on an accessible starting point for students.

The team selected four prototype areas: a main interface and simulated login, conversational guidance, self-help resources, and service discovery. My assigned module was service information, location, and pricing.

## Iteration 3 — Building and Evaluating the MVP

### My Module: Service Explorer

I developed a browser-based service discovery interface using HTML, CSS, JavaScript, and the Google Maps JavaScript API.

Its main interactions include:

- Filtering by location, service type, and minimum or maximum price, including a free-service preset.
- Displaying matching services as cards with descriptions, prices, and category tags.
- Updating map markers to match the filtered results.
- Linking card selection with map focus and marker selection with the corresponding card.
- Resetting filters and displaying the number of matching results.

The implementation uses five hard-coded demonstration services. It demonstrates information discovery and comparison; it does not connect to a verified provider directory or complete appointments. Optional browser geolocation can display the user’s position on the map.

### The Wider Team Prototype

| Module | Implemented scope |
| --- | --- |
| Main interface | Navigation between service discovery, self-help, and conversational guidance. |
| Login | A simulated client-side entry flow, without real authentication. |
| Conversational guidance | Keyword- and pattern-based replies with links to prototype sections. The supplied implementation does not use a live generative AI service. |
| Self-help | Interfaces for breathing guidance, audio resources, and journaling. Testing identified unclear interaction feedback and a journaling issue. |
| Service Explorer | Local demonstration data, filters, result cards, and map interaction. |

Timetable integration, real booking, institutional integration, rewards, and production service data remained proposed or deferred features.

### User Evaluation

The team documented eight prototype participants. I conducted two evaluation sessions and synthesised their feedback through post-task interviews and think-aloud recall.

Both users valued the service discovery function and found the main features easy to locate. Their feedback also revealed uncertainty caused by inconsistent navigation labels and buttons that did not explain what would happen next. They liked the calm visual style but suggested larger text and clearer guidance.

The wider team summary raised additional issues around map visibility, language support, chatbot responses, and self-help interactions. These findings informed recommendations for:

1. Consistent navigation labels and brief explanations of features.
2. Clear confirmation and feedback after interactions.
3. More readable text and responsive layouts.
4. Better map presentation and clearer filter behaviour.
5. More flexible conversational guidance and a more visible urgent-help entry point.

These were recommendations from evaluation. The supplied materials do not establish that all were subsequently implemented.

## Outcome and Reflection

The project produced an interactive academic web MVP and a documented research trail across three iterations. The Service Explorer showed how an interview finding—uncertainty about service content and cost—could become a concrete interaction for browsing and comparison.

For me, the most useful learning was the connection between analysis and interface decisions. Research helped establish which information mattered; implementation made that information explorable; evaluation revealed where labels and feedback still created hesitation.

The small qualitative tests provide evidence of perceived usefulness and usability issues. They do not establish improved mental health outcomes or sustained adoption.
