const finals = {
  eventId: 1,
  catId: 1,
  bracket: "Finals",
  seed: 1,
  match: {
    first: {
      nextMatch: null,
      stage_name: "Team Name: Number 1",
      status: null,
    },
    second: {
      stage_name: "Team Name: Number 2",
      status: null,
    },
  },
};

const top4 = {
  eventId: 1,
  catId: 1,
  matchType: "Top-4",
  matches: {
    finals: [
      {
        nextMatch: null,
        prevMatch: ["4-1", "4-2"],
        round: 2,
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
    ],
    top4: [
      {
        nextMatch: "2-1",
        prevMatch: null,
        round: 4,
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
        nextMatch: "2-1",
        prevMatch: null,
        round: 4,
        seed: 2,
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
  eventId: 2,
  catId: 1,
  matchType: "Top-8",
  matches: {
    finals: [
      {
        nextMatch: null,
        prevMatch: ["4-1", "4-2"],
        round: 2,
        seed: 1,
        first: {
          nextMatch: null,
          stage_name: "Team Name: Number 1",
          status: null,
        },
        second: {
          nextMatch: null,
          stage_name: "Team Name: Number 3",
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
        first: {
          stage_name: "Team Name: Number 1",
          status: null,
        },
        second: {
          stage_name: "Team Name: Number 5",
          status: null,
        },
      },
      {
        nextMatch: "2-1",
        prevMatch: ["8-2", "8-4"],
        round: 4,
        seed: 2,
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
  eventId: 3,
  catId: 1,
  matchType: "Top-16",
  matches: {
    finals: [
      {
        nextMatch: null,
        prevMatch: ["4-1", "4-2"],
        round: 2,
        seed: 1,
        first: {
          nextMatch: null,
          stage_name: "Team Name: Number 1",
          status: null,
        },
        second: {
          nextMatch: null,
          stage_name: "Team Name: Number 7",
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
        first: {
          stage_name: "Team Name: Number 1",
          status: null,
        },
        second: {
          stage_name: "Team Name: Number 9",
          status: null,
        },
      },
      {
        nextMatch: "2-1",
        prevMatch: ["8-2", "8-4"],
        round: 4,
        seed: 2,
        first: {
          stage_name: "Team Name: Number 7",
          status: null,
        },
        second: {
          stage_name: "Team Name: Number 16",
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
        first: {
          stage_name: "Team Name: Number 1",
          status: null,
        },
        second: {
          stage_name: "Team Name: Number 5",
          status: null,
        },
      },
      {
        nextMatch: "4-2",
        prevMatch: ["16-2", "16-4"],
        round: 8,
        seed: 2,
        first: {
          stage_name: "Team Name: Number 4",
          status: null,
        },
        second: {
          stage_name: "Team Name: Number 7",
          status: null,
        },
      },
      {
        nextMatch: "4-1",
        prevMatch: ["8-5", "8-7"],
        round: 8,
        seed: 3,
        first: {
          stage_name: "Team Name: Number 9",
          status: null,
        },
        second: {
          stage_name: "Team Name: Number 13",
          status: null,
        },
      },
      {
        nextMatch: "4-2",
        prevMatch: ["16-6", "16-8"],
        round: 8,
        seed: 4,
        first: {
          stage_name: "Team Name: Number 12",
          status: null,
        },
        second: {
          stage_name: "Team Name: Number 16",
          status: null,
        },
      },
    ],
    top16: [
      {
        nextMatch: "8-1",
        prevMatch: null,
        round: 16,
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

const top32 = {
  eventId: 3,
  catId: 1,
  matchType: "Top-32",
  matches: {
    finals: [
      {
        nextMatch: null,
        prevMatch: ["4-1", "4-2"],
        round: 2,
        seed: 1,
        first: {
          nextMatch: null,
          stage_name: "Team Name: Number 1",
          status: null,
        },
        second: {
          nextMatch: null,
          stage_name: "Team Name: Number 7",
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
        first: {
          stage_name: "Team Name: Number 1",
          status: null,
        },
        second: {
          stage_name: "Team Name: Number 9",
          status: null,
        },
      },
      {
        nextMatch: "2-1",
        prevMatch: ["8-2", "8-4"],
        round: 4,
        seed: 2,
        first: {
          stage_name: "Team Name: Number 7",
          status: null,
        },
        second: {
          stage_name: "Team Name: Number 16",
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
        first: {
          stage_name: "Team Name: Number 1",
          status: null,
        },
        second: {
          stage_name: "Team Name: Number 5",
          status: null,
        },
      },
      {
        nextMatch: "4-2",
        prevMatch: ["16-2", "16-4"],
        round: 8,
        seed: 2,
        first: {
          stage_name: "Team Name: Number 4",
          status: null,
        },
        second: {
          stage_name: "Team Name: Number 7",
          status: null,
        },
      },
      {
        nextMatch: "4-1",
        prevMatch: ["8-5", "8-7"],
        round: 8,
        seed: 3,
        first: {
          stage_name: "Team Name: Number 9",
          status: null,
        },
        second: {
          stage_name: "Team Name: Number 13",
          status: null,
        },
      },
      {
        nextMatch: "4-2",
        prevMatch: ["16-6", "16-8"],
        round: 8,
        seed: 4,
        first: {
          stage_name: "Team Name: Number 12",
          status: null,
        },
        second: {
          stage_name: "Team Name: Number 16",
          status: null,
        },
      },
    ],
    top16: [
      {
        nextMatch: "8-1",
        prevMatch: ["32-1", "32-3"],
        round: 16,
        seed: 1,
        first: {
          stage_name: "Team Name: Number 1",
          status: null,
        },
        second: {
          stage_name: "Team Name: Number 5",
          status: null,
        },
      },
      {
        nextMatch: "8-2",
        prevMatch: ["32-2", "32-4"],
        round: 16,
        seed: 2,
        first: {
          stage_name: "Team Name: Number 4",
          status: null,
        },
        second: {
          stage_name: "Team Name: Number 7",
          status: null,
        },
      },
      {
        nextMatch: "8-1",
        prevMatch: ["32-5", "32-7"],
        round: 16,
        seed: 3,
        first: {
          stage_name: "Team Name: Number 9",
          status: null,
        },
        second: {
          stage_name: "Team Name: Number 13",
          status: null,
        },
      },
      {
        nextMatch: "8-2",
        prevMatch: ["32-6", "32-8"],
        round: 16,
        seed: 4,
        first: {
          stage_name: "Team Name: Number 12",
          status: null,
        },
        second: {
          stage_name: "Team Name: Number 16",
          status: null,
        },
      },
      {
        nextMatch: "8-3",
        prevMatch: ["32-9", "32-11"],
        round: 16,
        seed: 5,
        first: {
          stage_name: "Team Name: Number 18",
          status: null,
        },
        second: {
          stage_name: "Team Name: Number 22",
          status: null,
        },
      },
      {
        nextMatch: "8-4",
        prevMatch: ["32-10", "32-12"],
        round: 16,
        seed: 6,
        first: {
          stage_name: "Team Name: Number 20",
          status: null,
        },
        second: {
          stage_name: "Team Name: Number 24",
          status: null,
        },
      },
      {
        nextMatch: "8-3",
        prevMatch: ["32-13", "32-15"],
        round: 16,
        seed: 7,
        first: {
          stage_name: "Team Name: Number 26",
          status: null,
        },
        second: {
          stage_name: "Team Name: Number 30",
          status: null,
        },
      },
      {
        nextMatch: "8-4",
        prevMatch: ["32-15", "32-16"],
        round: 16,
        seed: 8,
        first: {
          stage_name: "Team Name: Number 28",
          status: null,
        },
        second: {
          stage_name: "Team Name: Number 31",
          status: null,
        },
      },
    ],
    top32: [
      {
        nextMatch: "8-1",
        prevMatch: null,
        round: 16,
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
      {
        nextMatch: "8-1",
        prevMatch: null,
        round: 16,
        seed: 9,
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
        seed: 10,
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
        seed: 11,
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
        seed: 12,
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
        seed: 13,
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
        seed: 14,
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
        seed: 15,
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
        seed: 16,
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

const top64 = {
  eventId: 3,
  catId: 1,
  matchType: "Top-64",
  matches: {
    finals: [
      {
        nextMatch: null,
        prevMatch: ["4-1", "4-2"],
        round: 2,
        seed: 1,
        first: {
          nextMatch: null,
          stage_name: "Team Name: Number 1",
          status: null,
        },
        second: {
          nextMatch: null,
          stage_name: "Team Name: Number 7",
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
        first: {
          stage_name: "Team Name: Number 1",
          status: null,
        },
        second: {
          stage_name: "Team Name: Number 9",
          status: null,
        },
      },
      {
        nextMatch: "2-1",
        prevMatch: ["8-2", "8-4"],
        round: 4,
        seed: 2,
        first: {
          stage_name: "Team Name: Number 7",
          status: null,
        },
        second: {
          stage_name: "Team Name: Number 16",
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
        first: {
          stage_name: "Team Name: Number 1",
          status: null,
        },
        second: {
          stage_name: "Team Name: Number 5",
          status: null,
        },
      },
      {
        nextMatch: "4-2",
        prevMatch: ["16-2", "16-4"],
        round: 8,
        seed: 2,
        first: {
          stage_name: "Team Name: Number 4",
          status: null,
        },
        second: {
          stage_name: "Team Name: Number 7",
          status: null,
        },
      },
      {
        nextMatch: "4-1",
        prevMatch: ["8-5", "8-7"],
        round: 8,
        seed: 3,
        first: {
          stage_name: "Team Name: Number 9",
          status: null,
        },
        second: {
          stage_name: "Team Name: Number 13",
          status: null,
        },
      },
      {
        nextMatch: "4-2",
        prevMatch: ["16-6", "16-8"],
        round: 8,
        seed: 4,
        first: {
          stage_name: "Team Name: Number 12",
          status: null,
        },
        second: {
          stage_name: "Team Name: Number 16",
          status: null,
        },
      },
    ],
    top16: [
      {
        nextMatch: "8-1",
        prevMatch: ["32-1", "32-3"],
        round: 16,
        seed: 1,
        first: {
          stage_name: "Team Name: Number 1",
          status: null,
        },
        second: {
          stage_name: "Team Name: Number 5",
          status: null,
        },
      },
      {
        nextMatch: "8-2",
        prevMatch: ["32-2", "32-4"],
        round: 16,
        seed: 2,
        first: {
          stage_name: "Team Name: Number 4",
          status: null,
        },
        second: {
          stage_name: "Team Name: Number 7",
          status: null,
        },
      },
      {
        nextMatch: "8-1",
        prevMatch: ["32-5", "32-7"],
        round: 16,
        seed: 3,
        first: {
          stage_name: "Team Name: Number 9",
          status: null,
        },
        second: {
          stage_name: "Team Name: Number 13",
          status: null,
        },
      },
      {
        nextMatch: "8-2",
        prevMatch: ["32-6", "32-8"],
        round: 16,
        seed: 4,
        first: {
          stage_name: "Team Name: Number 12",
          status: null,
        },
        second: {
          stage_name: "Team Name: Number 16",
          status: null,
        },
      },
      {
        nextMatch: "8-3",
        prevMatch: ["32-9", "32-11"],
        round: 16,
        seed: 5,
        first: {
          stage_name: "Team Name: Number 18",
          status: null,
        },
        second: {
          stage_name: "Team Name: Number 22",
          status: null,
        },
      },
      {
        nextMatch: "8-4",
        prevMatch: ["32-10", "32-12"],
        round: 16,
        seed: 6,
        first: {
          stage_name: "Team Name: Number 20",
          status: null,
        },
        second: {
          stage_name: "Team Name: Number 24",
          status: null,
        },
      },
      {
        nextMatch: "8-3",
        prevMatch: ["32-13", "32-15"],
        round: 16,
        seed: 7,
        first: {
          stage_name: "Team Name: Number 26",
          status: null,
        },
        second: {
          stage_name: "Team Name: Number 30",
          status: null,
        },
      },
      {
        nextMatch: "8-4",
        prevMatch: ["32-15", "32-16"],
        round: 16,
        seed: 8,
        first: {
          stage_name: "Team Name: Number 28",
          status: null,
        },
        second: {
          stage_name: "Team Name: Number 31",
          status: null,
        },
      },
    ],
    top32: [
      {
        nextMatch: "16-1",
        prevMatch: ["64-1", "64-3"],
        round: 32,
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
        nextMatch: "16-2",
        prevMatch: ["64-2", "64-4"],
        round: 32,
        seed: 2,
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
        nextMatch: "16-1",
        prevMatch: ["64-5", "64-7"],
        round: 32,
        seed: 3,
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
        nextMatch: "16-2",
        prevMatch: ["64-6", "64-8"],
        round: 32,
        seed: 4,
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
        nextMatch: "16-3",
        prevMatch: ["64-9", "64-11"],
        round: 32,
        seed: 5,
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
        nextMatch: "16-4",
        prevMatch: ["64-10", "64-12"],
        round: 32,
        seed: 6,
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
        nextMatch: "16-3",
        prevMatch: ["64-13", "64-15"],
        round: 32,
        seed: 7,
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
        nextMatch: "16-4",
        prevMatch: ["64-14", "64-16"],
        round: 32,
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
      {
        nextMatch: "16-5",
        prevMatch: ["64-17", "64-19"],
        round: 32,
        seed: 9,
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
        nextMatch: "16-6",
        prevMatch: ["64-18", "64-20"],
        round: 32,
        seed: 10,
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
        nextMatch: "16-5",
        prevMatch: ["64-21", "64-23"],
        round: 32,
        seed: 11,
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
        nextMatch: "16-6",
        prevMatch: ["64-22", "64-24"],
        round: 32,
        seed: 12,
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
        nextMatch: "16-7",
        prevMatch: ["64-25", "64-27"],
        round: 32,
        seed: 13,
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
        nextMatch: "16-8",
        prevMatch: ["64-26", "64-28"],
        round: 32,
        seed: 14,
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
        nextMatch: "16-7",
        prevMatch: ["64-29", "64-31"],
        round: 32,
        seed: 15,
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
        nextMatch: "16-8",
        prevMatch: ["64-30", "64-32"],
        round: 32,
        seed: 16,
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
    top64: [
      {
        nextMatch: "32-1",
        prevMatch: null,
        round: 64,
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
        nextMatch: "32-2",
        prevMatch: null,
        round: 64,
        seed: 2,
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
        nextMatch: "32-1",
        prevMatch: null,
        round: 64,
        seed: 3,
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
        nextMatch: "32-2",
        prevMatch: null,
        round: 64,
        seed: 4,
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
        nextMatch: "32-3",
        prevMatch: null,
        round: 64,
        seed: 5,
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
        nextMatch: "32-4",
        prevMatch: null,
        round: 64,
        seed: 6,
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
        nextMatch: "32-3",
        prevMatch: null,
        round: 64,
        seed: 7,
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
        nextMatch: "32-4",
        prevMatch: null,
        round: 64,
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
      {
        nextMatch: "32-5",
        prevMatch: null,
        round: 64,
        seed: 9,
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
        nextMatch: "32-6",
        prevMatch: null,
        round: 64,
        seed: 10,
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
        nextMatch: "32-5",
        prevMatch: null,
        round: 64,
        seed: 11,
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
        nextMatch: "32-6",
        prevMatch: null,
        round: 64,
        seed: 12,
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
        nextMatch: "32-7",
        prevMatch: null,
        round: 64,
        seed: 13,
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
        nextMatch: "32-8",
        prevMatch: null,
        round: 64,
        seed: 14,
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
        nextMatch: "32-7",
        prevMatch: null,
        round: 64,
        seed: 15,
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
        nextMatch: "32-8",
        prevMatch: null,
        round: 64,
        seed: 16,
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
        nextMatch: "32-9",
        prevMatch: null,
        round: 64,
        seed: 17,
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
        nextMatch: "32-10",
        prevMatch: null,
        round: 64,
        seed: 18,
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
        nextMatch: "32-9",
        prevMatch: null,
        round: 64,
        seed: 19,
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
        nextMatch: "32-10",
        prevMatch: null,
        round: 64,
        seed: 20,
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
        nextMatch: "32-11",
        prevMatch: null,
        round: 64,
        seed: 21,
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
        nextMatch: "32-12",
        prevMatch: null,
        round: 64,
        seed: 22,
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
        nextMatch: "32-11",
        prevMatch: null,
        round: 64,
        seed: 23,
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
        nextMatch: "32-12",
        prevMatch: null,
        round: 64,
        seed: 24,
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
        nextMatch: "32-13",
        prevMatch: null,
        round: 64,
        seed: 25,
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
        nextMatch: "32-14",
        prevMatch: null,
        round: 64,
        seed: 26,
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
        nextMatch: "32-13",
        prevMatch: null,
        round: 64,
        seed: 27,
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
        nextMatch: "32-14",
        prevMatch: null,
        round: 64,
        seed: 28,
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
        nextMatch: "32-15",
        prevMatch: null,
        round: 64,
        seed: 29,
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
        nextMatch: "32-16",
        prevMatch: null,
        round: 64,
        seed: 30,
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
        nextMatch: "32-15",
        prevMatch: null,
        round: 64,
        seed: 31,
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
        nextMatch: "32-16",
        prevMatch: null,
        round: 64,
        seed: 32,
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

export { top64, top32, top16, top8, finals };
