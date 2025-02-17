import JsonTree from "src/components/JsonTree";
import PageWrapper from "src/components/PageWrapper";

const testData = [
  {
    title: "Interstellar",
    admin: {
      username: "Adam",
      favorites: ["Chinatown", "Memento", "To Catch a Thief"],
    },
    badKey: null,
  },

  // Medium Example: An object with multiple properties
  {
    title: "Inception",
    year: 2010,
    director: "Christopher Nolan",
    genres: ["Action", "Adventure", "Sci-Fi"],
  },

  // Complex Example 1: An object representing a movie with nested objects and arrays
  {
    movie: {
      title: "The Matrix",
      year: 1999,
      director: {
        firstName: "Lana",
        lastName: "Wachowski",
      },
      cast: [
        {
          actor: "Keanu Reeves",
          role: "Neo",
        },
        {
          actor: "Laurence Fishburne",
          role: "Morpheus",
        },
        {
          actor: "Carrie-Anne Moss",
          role: "Trinity",
        },
      ],
      genres: ["Action", "Sci-Fi"],
      ratings: {
        IMDb: 8.7,
        "Rotten Tomatoes": "87%",
      },
    },
  },

  // Complex Example 2: An array of movie objects with nested structures
  {
    movies: [
      {
        title: "The Lord of the Rings: The Fellowship of the Ring",
        year: 2001,
        director: "Peter Jackson",
        cast: [
          {
            actor: "Elijah Wood",
            role: "Frodo Baggins",
          },
          {
            actor: "Ian McKellen",
            role: "Gandalf",
          },
        ],
        genres: ["Adventure", "Drama", "Fantasy"],
        boxOffice: {
          budget: "$93,000,000",
          grossWorldwide: "$871,530,324",
        },
      },
      {
        title: "The Dark Knight",
        year: 2008,
        director: "Christopher Nolan",
        cast: [
          {
            actor: "Christian Bale",
            role: "Bruce Wayne / Batman",
          },
          {
            actor: "Heath Ledger",
            role: "Joker",
          },
        ],
        genres: ["Action", "Crime", "Drama"],
        boxOffice: {
          budget: "$185,000,000",
          grossWorldwide: "$1,005,973,645",
        },
      },
    ],
  },
  {
    string: "string",
    boolean: true,
    integer: 1979,
    float: 2000.1,
    null: null,
    array: [],
    object: {},
    nonEmptyArray: [
      "item1",
      {
        uhoh: {
          itsnested: ["oops", 2, 4],
        },
      },
    ],
    function: function (x: string) {
      return `hello, there, ${x}`;
    },
  },
];

export default function Sandbox() {
  return (
    <PageWrapper title="Sandbox">
      {testData.map((test, i) => (
        <JsonTree key={i}>{test}</JsonTree>
      ))}
    </PageWrapper>
  );
}
