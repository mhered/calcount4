import create from "zustand";

// unsafe merge state
// and mew properties will added or existing properties will be changed
// but the type of value of the property must not change
function mergeState(baseState, newState) {
  if (
    typeof newState === "object" &&
    !Array.isArray(newState) &&
    newState !== null
  ) {
    const keys = Object.keys(newState);
    keys.forEach((key) => {
      // create a new key in base if not exists
      if (!(key in baseState)) {
        baseState[key] = {};
      }
      if (typeof newState[key] === "object" && !Array.isArray(newState[key]))
        mergeState(baseState[key], newState[key]);
      else baseState[key] = newState[key];
    });
  }
}

const useStore = create((set) => {
  return {
    setPage: (pageName, newState) =>
      set((state) => {
        const pageState = JSON.parse(JSON.stringify(state[pageName]));
        mergeState(pageState, newState);
        return { [pageName]: pageState };
      }),
  };
});

export function updateStoreStateFromController(pageName, newState) {
  useStore.getState().setPage(pageName, newState);
}

const desktopModeProps = {
  ...{
  "Home": {
    "Div1": {
      "callbacks": {}
    },
    "Flex1": {
      "callbacks": {}
    },
    "Flex2": {
      "callbacks": {}
    },
    "Flex3": {
      "callbacks": {}
    },
    "TextBox2": {
      "custom": {
        "text": " Calorie Tracker"
      },
      "callbacks": {
        "onClick": [
          {
            "sendEventData": true
          }
        ]
      }
    },
    "Table1": {
      "custom": {
        "rows": [
          {
            "id": 0,
            "calories": 0,
            "carbs": 0,
            "fat": 0,
            "name": "Total",
            "protein": 0
          }
        ],
        "cols": [
          {
            "field": "name",
            "headerName": "Food"
          },
          {
            "field": "fat",
            "headerName": "Fat (g)",
            "type": "number"
          },
          {
            "field": "carbs",
            "headerName": "Carbohidrates (g)",
            "type": "number"
          },
          {
            "field": "protein",
            "headerName": "Protein (g)",
            "type": "number"
          },
          {
            "field": "calories",
            "headerName": "Calories (cal)",
            "type": "number"
          }
        ]
      },
      "callbacks": {}
    },
    "LineChart1": {
      "custom": {
        "data": [
          {
            "date": "18/10",
            "calories": 2100,
            "carbs": 289,
            "fat": 70,
            "protein": 79
          },
          {
            "date": "19/10",
            "calories": 1732,
            "carbs": 179,
            "fat": 80,
            "protein": 74
          },
          {
            "date": "20/10",
            "calories": 1697,
            "carbs": 200,
            "fat": 69,
            "protein": 69
          },
          {
            "date": "21/10",
            "calories": 1821,
            "carbs": 213,
            "fat": 77,
            "protein": 69
          },
          {
            "date": "22/10",
            "calories": 1797,
            "carbs": 180,
            "fat": 85,
            "protein": 78
          },
          {
            "date": "23/10",
            "calories": 1736,
            "carbs": 158,
            "fat": 84,
            "protein": 87
          },
          {
            "date": "24/10",
            "calories": 0,
            "carbs": 0,
            "fat": 0,
            "protein": 0
          }
        ],
        "xAxis": {
          "show": true,
          "key": "date"
        },
        "yAxis": {
          "show": true
        },
        "toolTip": {
          "show": true
        },
        "legend": {
          "show": true
        },
        "chartHeight": 400,
        "chartWidth": 400
      },
      "callbacks": {}
    },
    "Button1": {
      "custom": {
        "text": "Add"
      },
      "callbacks": {
        "onClick": [
          {
            "sendEventData": true
          }
        ]
      }
    },
    "TextBox1": {
      "custom": {
        "text": "What did you eat today?"
      },
      "callbacks": {
        "onClick": [
          {
            "sendEventData": true
          }
        ]
      }
    },
    "Dropdown1": {
      "custom": {
        "values": [
          "",
          "1 cup milk",
          "1 apple",
          "1 orange",
          "1 tomato",
          "1 carrot",
          "1 egg",
          "1 portion fries",
          "1 burger",
          "1 pizza",
          "1 icecream"
        ]
      },
      "callbacks": {}
    }
  }
}};

useStore.setState(desktopModeProps);

export default useStore;
