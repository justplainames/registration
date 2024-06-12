// const finals = {
//   eventId: null,
//   catId: null,
//   matchType: "Top-2",
//   matches: {
//     finals: [
//       {
//         nextMatch: null,
//         prevMatch: null,
//         round: 2,
//         seed: 1,
//         seed_status: null,
//         first: {
//           stage_name: null,
//           status: null,
//         },
//         second: {
//           stage_name: null,
//           status: null,
//         },
//       },
//     ],
//   },
// };

const top4 = {
  eventId: null,
  catId: null,
  matchType: "Top-4",
  seed: 1,
  matches: {
    finals: [
      {
        nextMatch: null,
        prevMatch: ["4-1", "4-2"],
        round: 2,
        seed: 1,
        seed_status: null,
        first: {
          stage_name: null,
          status: null,
        },
        second: {
          stage_name: null,
          status: null,
        },
      },
    ],
    top4: [
      {
        nextMatch: "2-1",
        prevMatch: null,
        round: 4,
        seed: 1,
        seed_status: null,
        first: {
          stage_name: null,
          status: null,
        },
        second: {
          stage_name: null,
          status: null,
        },
      },
      {
        nextMatch: "2-1",
        prevMatch: null,
        round: 4,
        seed: 2,
        seed_status: null,
        first: {
          stage_name: null,
          status: null,
        },
        second: {
          stage_name: null,
          status: null,
        },
      },
    ],
  },
};

const top8 = {
  eventId: null,
  catId: null,
  matchType: "Top-8",
  matches: {
    finals: [
      {
        nextMatch: null,
        prevMatch: ["4-1", "4-2"],
        round: 2,
        seed: 1,
        seed_status: null,
        first: {
          nextMatch: null,
          stage_name: null,
          status: null,
        },
        second: {
          nextMatch: null,
          stage_name: null,
          status: null,
        },
      },
    ],
    top4: [
      {
        nextMatch: "2-1",
        prevMatch: ["8-1", "8-3"],
        round: 4,
        seed: 1,
        seed_status: null,
        first: {
          stage_name: null,
          status: null,
        },
        second: {
          stage_name: null,
          status: null,
        },
      },
      {
        nextMatch: "2-1",
        prevMatch: ["8-2", "8-4"],
        round: 4,
        seed: 2,
        seed_status: null,
        first: {
          stage_name: null,
          status: null,
        },
        second: {
          stage_name: null,
          status: null,
        },
      },
    ],
    top8: [
      {
        nextMatch: "4-1",
        prevMatch: null,
        round: 8,
        seed: 1,
        seed_status: null,
        first: {
          stage_name: null,
          status: null,
        },
        second: {
          stage_name: null,
          status: null,
        },
      },
      {
        nextMatch: "4-2",
        prevMatch: null,
        round: 8,
        seed: 2,
        seed_status: null,
        first: {
          stage_name: null,
          status: null,
        },
        second: {
          stage_name: null,
          status: null,
        },
      },
      {
        nextMatch: "4-1",
        prevMatch: null,
        round: 8,
        seed: 3,
        seed_status: null,
        first: {
          stage_name: null,
          status: null,
        },
        second: {
          stage_name: null,
          status: null,
        },
      },
      {
        nextMatch: "4-2",
        prevMatch: null,
        round: 8,
        seed: 4,
        seed_status: null,
        first: {
          stage_name: null,
          status: null,
        },
        second: {
          stage_name: null,
          status: null,
        },
      },
    ],
  },
};

const top16 = {
  eventId: null,
  catId: null,
  matchType: "Top-16",
  matches: {
    finals: [
      {
        nextMatch: null,
        prevMatch: ["4-1", "4-2"],
        round: 2,
        seed: 1,
        seed_status: null,
        first: {
          nextMatch: null,
          stage_name: null,
          status: null,
        },
        second: {
          nextMatch: null,
          stage_name: null,
          status: null,
        },
      },
    ],
    top4: [
      {
        nextMatch: "2-1",
        prevMatch: ["8-1", "8-3"],
        round: 4,
        seed: 1,
        seed_status: null,
        first: {
          stage_name: null,
          status: null,
        },
        second: {
          stage_name: null,
          status: null,
        },
      },
      {
        nextMatch: "2-1",
        prevMatch: ["8-2", "8-4"],
        round: 4,
        seed: 2,
        seed_status: null,
        first: {
          stage_name: null,
          status: null,
        },
        second: {
          stage_name: null,
          status: null,
        },
      },
    ],
    top8: [
      {
        nextMatch: "4-1",
        prevMatch: ["16-1", "16-3"],
        round: 8,
        seed: 1,
        seed_status: null,
        first: {
          stage_name: null,
          status: null,
        },
        second: {
          stage_name: null,
          status: null,
        },
      },
      {
        nextMatch: "4-2",
        prevMatch: ["16-2", "16-4"],
        round: 8,
        seed: 2,
        seed_status: null,
        first: {
          stage_name: null,
          status: null,
        },
        second: {
          stage_name: null,
          status: null,
        },
      },
      {
        nextMatch: "4-1",
        prevMatch: ["16-5", "16-7"],
        round: 8,
        seed: 3,
        seed_status: null,
        first: {
          stage_name: null,
          status: null,
        },
        second: {
          stage_name: null,
          status: null,
        },
      },
      {
        nextMatch: "4-2",
        prevMatch: ["16-6", "16-8"],
        round: 8,
        seed: 4,
        seed_status: null,
        first: {
          stage_name: null,
          status: null,
        },
        second: {
          stage_name: null,
          status: null,
        },
      },
    ],
    top16: [
      {
        nextMatch: "8-1",
        prevMatch: null,
        round: 16,
        seed_status: null,
        seed: 1,
        first: {
          stage_name: null,
          status: null,
        },
        second: {
          stage_name: null,
          status: null,
        },
      },
      {
        nextMatch: "8-2",
        prevMatch: null,
        round: 16,
        seed: 2,
        seed_status: null,
        first: {
          stage_name: null,
          status: null,
        },
        second: {
          stage_name: null,
          status: null,
        },
      },
      {
        nextMatch: "8-1",
        prevMatch: null,
        round: 16,
        seed: 3,
        seed_status: null,
        first: {
          stage_name: null,
          status: null,
        },
        second: {
          stage_name: null,
          status: null,
        },
      },
      {
        nextMatch: "8-2",
        prevMatch: null,
        round: 16,
        seed: 4,
        seed_status: null,
        first: {
          stage_name: null,
          status: null,
        },
        second: {
          stage_name: null,
          status: null,
        },
      },
      {
        nextMatch: "8-3",
        prevMatch: null,
        round: 16,
        seed: 5,
        seed_status: null,
        first: {
          stage_name: null,
          status: null,
        },
        second: {
          stage_name: null,
          status: null,
        },
      },
      {
        nextMatch: "8-4",
        prevMatch: null,
        round: 16,
        seed: 6,
        seed_status: null,
        first: {
          stage_name: null,
          status: null,
        },
        second: {
          stage_name: null,
          status: null,
        },
      },
      {
        nextMatch: "8-3",
        prevMatch: null,
        round: 16,
        seed: 7,
        seed_status: null,
        first: {
          stage_name: null,
          status: null,
        },
        second: {
          stage_name: null,
          status: null,
        },
      },
      {
        nextMatch: "8-4",
        prevMatch: null,
        round: 16,
        seed_status: null,
        seed: 8,
        first: {
          stage_name: null,
          status: null,
        },
        second: {
          stage_name: null,
          status: null,
        },
      },
    ],
  },
};

module.exports = { top8, top16, top4 };
