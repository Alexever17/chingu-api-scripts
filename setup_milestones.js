// To use this script, set the `cohort_id` to an id of the cohort you want and fill the `tier_ids` array with the
// ids of the tiers you want to use. Then fill the `acts_data` array with json objects representing individual acts
// with their milestones (an example below). This script doesnt check for existing data nor does it delete anything.
//
// {
//   title: 'Act I: Project Setup',
//   order_index: 0,
//   repeatable: false,
//   milestones: [
//     {
//       title: 'Brainstorm Project Options',
//       order_index: 2,
//       description: `asdas`,
//       resource_url: null,
//     },
//     {
//       title: 'Define Your Workflow',
//       order_index: 3,
//       description: `asdasd`,
//       resource_url: null,
//     },
//     {
//       title: 'Set Up',
//       order_index: 4,
//       description: "asdsa",
//       resource_url: null,
//     },
//   ],
// },
//
// To use this script first `npm install` then `node ./setup_milestones.js`

const { chinguAPI, mutations: { CreateAct, CreateMilestone, CreateActMilestone } } = require('./cdn-api');

const cohort_id = 1;
const tier_ids = [2, 3];

const acts_data = [
  {
    title: 'Act I: Project Setup',
    order_index: 0,
    repeatable: false,
    milestones: [
      {
        title: 'Meet the Team',
        order_index: 0,
        description: `
*Goal*: Get acquainted with your teammates.

*Suggested Actions*: 
> Read each other's intro stories.
> Share a project or two you are most proud of in your learning journey.
> Share some prime picks from your gif collection.

*Icebreakers*:
> What time zone are you in?
> What sort of music do you like to code to? 
> What is your preferred learning style (videos, docs, dialoge etc)?
> What are your favorite YouTube channels, subreddits or blogs?
> What technologies are you most comfortable using and explaining?
> What technologies are you most interested in learning this Voyage?
        `,
        resource_url: null,
      },
      {
        title: 'Set Goals and Expectations',
        order_index: 1,
        description: `
*Goal*: Determine the team's learning expectations and availability.

*Commitment*: 
> It is critical to make sure that everyone is realistic in their level of commitment and availability.
> Working less than you commit to is disrespectful to your teammates and can stunt the team's progress and morale.
> Typically team members commit 4-10 hours a week towards the project.

*Learning Goals*: 
> Evaluate everyone's current technical abilities.
> Determine at least one primary technical learning goal for each teammate
> Pick something that is 25% outside of the team's comfort zone / skillset. 
> Any further and you will likely be overwhelmed. 
> Any less and you are limiting your rate of learning. 

*Voyages go by faster than you think and you need to focus on learning through building rather than getting caught in research rabbit-holes*.
        `,
        resource_url: null,
      },
      {
        title: 'Brainstorm Project Options',
        order_index: 2,
        description: `
*Goal*: Decide on a project to pursue.

*Tips*:
> Stay focused on what is possible as a balance of the cohort season's length, team experience and the commitment level.
> Remember to incorporate as many team learning goals as are feasible. 
> *The goal is to learn something new not to stay stuck only working with what you know.*

*The Stack*:
> Front End - consider the library / framework your project will use
> Back End - consider the backend language and library / framework
> Database - consider the database type and ORM your team will use to interact with it

*It is better to underpromise and overdeliver _especially if this is your first Voyage_*
        `,
        resource_url: null,
      },
      {
        title: 'Define Your Workflow',
        order_index: 3,
        description: `
*Goal*: Decide on which workflow tools the team will use.

*Tips*:
> Don't go overboard! Workflow tools are only useful when they are used. Keep it simple so that using the tools feels effortless rather than a chore.
> If you don't already have a workflow or specific tools in mind consider the suggestions below.

*Suggested Workflow Tools*
>Besides the obvious Slack and Github the following are tools that work for many Chingu teams
> <https://www.waffle.io|Waffle> - Trello and Github had a baby that makes project management a breeze
> <https://www.discord.com|Discord> - "Always-on" communication tool. Leave it on mute while you work then unmute as needed to gain access to team mates for problem solving detours. Use it for clear audio while using Google Hangouts (don't forget to mute the echo from Hangouts!)
> <https://hangouts.google.com|Google Hangouts> - A screensharing / pair-programming must (until VSC Live comes out!!)

*Suggested Use*: 
> Hold a meeting on Discord and / or Hangouts to discuss the key steps required to complete the next sprint.
> Use Waffle to compartmentalize the steps of the sprints into grab-and-go tasks.
> Leave Discord on and unmute as needed to discuss and conquer roadblocks.
> Use Slack for short code snippets. Use Hangouts to screenshare for more complex debugging.

*A proper workflow and concise collection of workflow tools is what makes the difference between a team that makes it and one that doesn't.*
        `,
        resource_url: null,
      },
      {
        title: 'Set Up',
        order_index: 4,
        description: `
*Goal*: Set up and explore your team's workflow tools.

*Tips*:
> Check to see if your pre-made Voyage team repo is functional and the proper permissions and settings are configured.
> Ask for help from the community with setting up tools if you get stuck. 
> Don't get turned off because the setup seems daunting. It's a one time process - take the time to do it right!

*Required*:
> Make sure everyone uses the tools. 
> Walk through an example usage of each tool and how they all come together.
> Work out any kinks in people's microphones, internet connections, permissions etc.

*The first sprint IS NOT the time to learn how to use the tools at hand.* 
*Get comfortable early so you can focus on building not technical difficulties!* 
        `,
        resource_url: null,
      },
      {
        title: 'Define the MVP',
        order_index: 5,
        description: `
*Goal*: Hold a meeting to decide on the minimum viable product (MVP).

*Tips*:
> Deciding on the MVP for the project is the most important step your team must take before embarking on your Voyage.
> Consider the features that can together serve, at minimum, as a functioning prototype of the project's vision.
> Defining the MVP is committing to the bare minimum you and the team will accomplish before the cohort deadline.

*Focus Points*:
> Front End - consider the views and their associated functionality
> Back End - consider the endpoints, routes and associated logic
> Database - consider the complexity of the database and associated models
> Deployment - consider how / where you will host the project

*Schedule a Meeting*
> Schedule your next meeting to plan your first sprint!

*Don't throw away those features and moonshot ideas that fall outside of the scope of the MVP!*
*Shoot for finishing the MVP ahead of schedule so the extra time can be used to implement those additional features and polish* 
        `,
        resource_url: null,
      },
    ],
  },

// ACT TWO
  {
    title: 'Act II: Project Sprints',
    order_index: 1,
    repeatable: true,
    milestones: [
      {
        title: 'Plan the Sprint',
        order_index: 0,
        description: `
*Goal*: Subdivide the MVP into a feature(s) sprint.

*Notes*: 
> Determine a starting point for working towards the completion of the MVP.
> The tasks for each sprint *should require 1 week or less to complete*.
> Do your best but don't worry if you underestimate the required time - you can reflect and adjust in the next sprint.

*Tips*:
> Select one or more top-level features from the MVP and explore how it can be broken down into individual tasks.
> Think about the order in which the tasks will be completed and mark those that can be worked on independently or in parallel.
> The team should take ample time to explore the sprint and all of its tasks. Everyone should be aware of the sprint on a conceptual and somewhat of a technical level.
> High level implementation details can be discussed but don't lose time writing out any code or specific details.
> Finer details and coding will take place after the sprint has been thoroughly explored.

*Workflow*
> Now is the time to create cards for each of the tasks. 
> Write the cards by adding descriptive titles and core details of the task as bullet points.
> The cards should serve as guidelines to each task with links to key references or specific notes that may be forgotten.
> Finish by reviewing and assigning the cards together as a team so that everyone is on the same page and knows what they are responsible for.

*Don't spend too much time writing the cards or getting caught up with all the fancy buttons!*
        `,
        resource_url: null,
      },
      {
        title: 'Begin the Sprint',
        order_index: 1,
        description: `
*Goal*: Turn all that talk into code!

*Tips*:
> Communicate when you're stuck. Don't stare at a screen alone.
> Everyone is here to learn - be patient with each other and encourage open discussion and brainstorming solutions to roadblocks.
> Use the help channels and friends from other teams to resolve complex issues if your team is stumped or unavailable.

*Schedule a Meeting*
> Schedule a time a few days from now to check in with everyone and make sure forward progress is being made by the team.

*Remote dev work is hard especially for beginners. Communicating openly and readily can make the difference between meeting a deadline or losing momentum.*
        `,
        resource_url: null,
      },
      {
        title: 'Team Standup Review',
        order_index: 2,
        description: `
*Goal*: Review the team's progress on the sprint.

*Tips*:
> Start by assessing everyone's status in the sprint.
> Discuss any roadblocks that are holding back progress.
> Explore solutions together and construct an actionable plan to move forward.
> Celebrate completed tasks and share the lessons learned in working on them.
> Assess the remaining tasks and take note of how close you are to meeting this sprint's weekly deadline.

*If anyone learned anything particularly valuable or overcame an irritating block be sure to share the experience in a Medium blog or discussion in the Chingu chat.*
        `,
        resource_url: null,
      },
      {
        title: 'Sprint Progress Review',
        order_index: 3,
        description: `
*Goal*: Review the team's progress on the sprint.

*Steps*:
> Assess everyone's status in the sprint.
> Discuss any roadblocks that are holding back progress.
> Explore solutions together and construct an actionable plan to move forward.
> Celebrate completed tasks and share the lessons learned in working on them.
> Assess the remaining tasks and take note of how close you are to meeting this sprint's weekly deadline.

*Tips*:
> Make sure that everyone is testing their code along the way.
> During the next phase of reviewing and merging the code no glaring issues or immediate bugs should be present.
> Take ownership of your tasks and make sure they have been vetted before moving onto the next one.
        `,
        resource_url: null,
      },
      {
        title: 'Code Review and Merging',
        order_index: 4,
        description: `
*Goal*: Review the code and merge into the development branch.

*Tips*:
> Cross-review each other's code and prevent merging without review.
> Engage in thoughtful disagreement by challenging each other respsectfully.
> Ask for clarification and add comments wherever needed.
> Openly explain decisions and implementation details.
> Test completed tasks whenever possible and seek out bugs to catch.
> Work on maintaining a consistent style across the team's code. Let it come organically or use a linter rules such as AirBnB or Google.

*Write detailed pull request notes to maintain a clear history of the project and its progress. These will also help team members cross-review your PRs*
        `,
        resource_url: null,
      },
      {
        title: 'Completed Sprint Review',
        order_index: 5,
        description: `
*Goal*: Go over the sprint and reflect on the experience gained.

*Steps*:
> Assess the number of remaining tasks
> Determine why they were left incomplete
> Discuss how the next sprint will be improved by factoring in the lessons learned
> Discuss how the workflow worked to or against your team's advantage
> Discuss any new ideas that stemmed from completing the tasks. Create notes or cards to keep these ideas handy for the future. 

*Be patient with each other and understand that it's okay to miss a deadline. Carry over the remaining tasks and plan better for the next one!*
        `,
        resource_url: null,
      },
    ],
  },

// ACT THREE

  {
    title: 'Act III: Project Closure',
    order_index: 0,
    repeatable: false,
    milestones: [
      {
        title: 'Tidy up your code & file structure',
        order_index: 0,
        description: `
  *Goal*: Have a codebase that you can look back on proudly in a few months and still understand what you were doing.
  
  When your code is clean, well structured, and *DRY*, you can easily share it with other programmers, possible employers, and future teammates.
  
  *Tips*:
  > Remove extra and unnecessary \`console.log(...)\` statements.
  > Comment your code thoroughly. (If you're using Javascript, consider the JSDoc pattern.)
  > Factor out any repetitive pieces of logic. Try to use more generic functions. (*Be careful!:* Don't make things too generic! It could make the code harder to understand.)
  > Use common file & folder structures and established community best practices in design patterns.
  
  *DRY* (*D*on't *R*epeat *Y*ourself): Try to factor out portions of your logic into reusable functions, classes, and components so as to avoid repeating yourself. Code that is factored this way is said to be *DRY*.
  
  *IMPORTANT:* After modifying your code, make sure you test it thoroughly so as to make sure you didn't break anything!
        `,
        resource_url: null,
      },
      {
        title: 'Polish the experience',
        order_index: 1,
        description: `
  *Goal*: Add the finishing touches to make this project really shine! This is where (if you have the time) you can go that extra mile.
  
  An optimized experience reflects well on your abilities and increases the credebility of the project.
  
  *Tips*:
  > Make it fully responsive and check your design on common screen sizes.
  > Make your methods and logic more efficient.
  > Decrease the size of what is downloaded by the user (At least on first load.)
        `,
        resource_url: null,
      },
      {
        title: 'Deploy it',
        order_index: 2,
        description: `
  *Goal*: Make your project publicly accessible.
  
  Once you deploy your project you can then share it with others so that they can review and use it. This is especially useful when you want to get feedback or just when you want to perform some user tests. Deploying is also useful because it allows you to provide a link to a live demo version on your resume and your portfolio.
  
  *Tips*:
  > Consider a simple, managed hosting service like Heroku or Google App Engine.
  > Don't worry too much about infrastructure design, just use the most basic setup possible so as not to run into issues.
  > Search online for deployment strategies that match your stack and your use case. You will find many articles and tutorials with step by step guides on how to deploy your favourite stack on a popular managed service.
        `,
        resource_url: null,
      },
      {
        title: 'Share it with trusted & experienced colleagues',
        order_index: 3,
        description: `
  *Goal*: Gather important feedback and perform some basic user testing.
  
  Sharing your project with peers is an extremely helpful way of gathering useful feedback. This could be feedback on the experience of your app or feedback on the actual code. You can then use this feedback to further polish the experience. Another benefit to having many people use your application is that you are more likely to catch bugs.
  
  *Tips*:
  > Share your project on chingu in #community-chat and ask people to check it out.
  > Share it with programmers you personally know such as friends, classmates, or work colleagues.
  > Don't explain the application too much. Just give them the basic idea and let them figure out how to use it. If they can't figure out how it works or if they are stuck on something then there is probably something wrong with the experience.
        `,
        resource_url: null,
      },
      {
        title: 'Share it with the world',
        order_index: 4,
        description: `
  *Goal*: More feedback and testing!
  
  When you share your project publicly you are likely to get even more useful feedback and catch more bugs since your audience is now much larger and more diverse. This also adds to your 'online presence' which is extremely valuable when applying for jobs.
  
  *Tips*:
  > Write a medium article announcing the project and asking people to try it out.
  > Share it on social media (Facebook, Twitter, etc.) and even on professional networks such as linkedin.
  > If you are part of any other technical/hacker communities consider sharing it there too.
  > Make sure the tier of hosting you are using is ready to handle the additional traffic.
        `,
        resource_url: null,
      },
      {
        title: 'Retrospective meeting',
        order_index: 5,
        description: `
  *Goal*: Solidify the experience and look back on everything you have accomplished.
  
  Organize a meeting with your team to discuss everything you have worked on, the outcome you have reached, the things you have learnt, your experience, and maybe even discuss the future of your project if you would like it to continue. Take this as an opportunity to compliment and, *more importantly*, critique each other. This will help you improve your soft skills and also provide your teammates with important feedback that they can also use to improve themselves.
  
  *Tips*:
  > Discuss the highs and the lows. Discuss the reasons behind the lows.
  > Give honest and critical feeback but don't be unnecessarily mean.
  > Take feedback from your teammates with an open mind. Don't be quick to snap or defend yourself. Use this as an opportunity to grow.
        `,
        resource_url: null,
      },
      {
        title: 'Document the experience',
        order_index: 6,
        description: `
  *Goal*: Increase your online presence and practice writing about your experience.
  
  Write about everything. Not just the actual project but also your experience, your thoughts, and your teammates. This is helpful because as you move forward in your career as a programmer you will have points of reference to look back on to see how you have grown not just technically but also in terms of soft skills.
  
  Getting into the habit of writing a lot will help you increase your online presence and ultimately improve your chances of getting a job.
  
  *Tips*:
  > Document everything regarding the experience.
  > Have your teammates review it before publishing. They might catch something you have forgotten.
  > Share the article with your peers and with the public to increase your online presence.
        `,
        resource_url: null,
      },
      {
        title: 'Complete Voyage',
        order_index: 7,
        description: `
        ????
        `,
        resource_url: null,
      }
    ],
  },  
];

const createActs = async (acts) => {
  return acts.map(({ title, order_index, repeatable }) => {
    return Promise.all(tier_ids.map((tier_id) => {
      return chinguAPI({
        query: CreateAct,
        variables: { act_data: { cohort_id, title, tier_id, order_index, repeatable } }
      });
    }));
  });
};

const extractMilestones = (acts) => {
  const milestones = [];
  acts.forEach(act => act.milestones.forEach(milestone => milestones.push(milestone)));
  return milestones;
};

const milestones_data = extractMilestones(acts_data);

const createMilestones = async (milestones) => {
  return Promise.all(milestones.map(({ title, description, resource_url }) => {
    return chinguAPI({
      query: CreateMilestone,
      variables: { milestone_data: { title, description, resource_url } }
    });
  }));
};

const getMilestoneStartIndex = (acts, act_index) => {
  let start_index = 0;
  for(let i = 0; i < acts.length && i < act_index; i++) {
    start_index += acts[i].milestones.length;
  }
  return start_index;
};

const linkActTiers = (act_tiers, act_index, milestones) => {
  act_tiers.then(act_tierss => {
    act_tierss.forEach(({ data: { createCohortTierAct: { id: cohort_tier_act_id, order_index } } }, tier_index) => {
      const milestone_start_index = getMilestoneStartIndex(acts_data, act_index);
      milestones.slice(
        milestone_start_index,
        milestone_start_index + acts_data[act_index].milestones.length,
      ).map(({ data: { createMilestone: { id: milestone_id } } }, milestone_index) => {
        return chinguAPI({
          query: CreateActMilestone,
          variables: { 
            act_milestone_data: { 
              cohort_tier_act_id, 
              milestone_id,
              order_index: milestones_data[milestone_start_index + milestone_index].order_index
            } 
          }
        });
      });
    });     
  });
};

async function upload() {
  createActs(acts_data).then(acts => {
    console.log('Acts created.');
    createMilestones(milestones_data).then(milestones => {
      console.log('Milestones created');
      acts.forEach((act_tiers, act_index) => {
        linkActTiers(act_tiers, act_index, milestones);
      });
    });
  });
}

upload();