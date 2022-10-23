from .atri import Atri
from fastapi import Request, Response
from atri_utils import *
from datetime import date, timedelta

HISTORY = [

     {
        "date":(date.today()-timedelta(days=6)).strftime("%d/%m"),
        "calories": 2100,
        "carbs": 289,
        "fat": 70,
        "protein": 79,
    },    
    {
        "date":(date.today()-timedelta(hours=24*5)).strftime("%d/%m"),
        "calories": 1732,
        "carbs": 179,
        "fat": 80,
        "protein": 74,
    },
    {
        "date":(date.today()-timedelta(hours=24*4)).strftime("%d/%m"),
        "calories": 1697,
        "carbs": 200,
        "fat": 69,
        "protein": 69,
    },
    {
        "date":(date.today()-timedelta(hours=24*3)).strftime("%d/%m"),
        "calories": 1821,
        "carbs": 213,
        "fat": 77,
        "protein": 69,
    },
    {
        "date":(date.today()-timedelta(hours=24*2)).strftime("%d/%m"),
        "calories": 1797,
        "carbs": 180,
        "fat": 85,
        "protein": 78,
    },
    {
        "date":(date.today()-timedelta(hours=24)).strftime("%d/%m"),
        "calories": 1736,
        "carbs": 158,
        "fat": 84,
        "protein": 87,
    },
    {
        "date":(date.today()).strftime("%d/%m"),
        "calories": 0,
        "carbs": 0,
        "fat": 0,
        "protein": 0,
    },
    ]

FOODS = [
        {
            'id': 1,
            'calories': 152,
            'carbs': 12,
            'fat': 8,
            'name': '1 cup milk',
            'protein': 8
        },
        {
            'id': 2,
            'calories': 100,
            'carbs': 25,
            'fat': 0,
            'name': '1 apple',
            'protein': 0
        },
        {
            'id': 3,
            'calories': 88,
            'carbs': 21,
            'fat': 0,
            'name': '1 orange',
            'protein': 1
        },
        {
            'id': 4,
            'calories': 20,
            'carbs': 4,
            'fat': 0,
            'name': '1 tomato',
            'protein': 1
        },
        {
            'id': 5,
            'calories': 36,
            'carbs': 8,
            'fat': 0,
            'name': '1 carrot',
            'protein': 1
        },
        {
            'id': 6,
            'calories': 69,
            'carbs': 0,
            'fat': 5,
            'name': '1 egg',
            'protein': 6
        },
        {
            'id': 7,
            'calories': 318,
            'carbs': 45,
            'fat': 14,
            'name': '1 portion fries',
            'protein': 3
        },
        {
            'id': 8,
            'calories': 332,
            'carbs': 8,
            'fat': 20,
            'name': '1 burger',
            'protein': 30
        },
        {
            'id': 9,
            'calories': 501,
            'carbs': 53,
            'fat': 21,
            'name': '1 pizza',
            'protein': 25
        },
        {
            'id': 10,
            'calories': 265,
            'carbs': 24,
            'fat': 17,
            'name': '1 icecream',
            'protein': 4
        },
    ]

def init_state(at: Atri):
    """
    This function is called everytime "Publish" button is hit in the editor.
    The argument "at" is a dictionary that has initial values set from visual editor.
    Changing values in this dictionary will modify the intial state of the app.
    """
    # describe column headers and the data type
    at.Table1.custom.cols = [
        # {"field": "id", "headerName": "ID"},
        {"field": "name", "headerName": "Food"},
        {"field": "fat", "headerName": "Fat (g)", "type": "number"},
        {"field": "carbs", "headerName": "Carbohidrates (g)", "type": "number"},
        {"field": "protein", "headerName": "Protein (g)", "type": "number"},
        {"field": "calories", "headerName": "Calories (cal)", "type": "number"},
    ]
    
    at.Table1.custom.rows = [{
            'id': 0,
            'calories': 0,
            'carbs': 0,
            'fat': 0,
            'name': 'Total',
            'protein': 0
        },]
    # add dropdown
    at.Dropdown1.custom.values = [""]+[item['name'] for item in FOODS]

    # history graph
    at.LineChart1.custom.data = HISTORY
    at.LineChart1.custom.xAxis = {"key": "date", "show": True}

def handle_page_request(at: Atri, req: Request, res: Response, query: str):
    """
    This function is called whenever a user loads this route in the browser.
    """
    pass


def handle_event(at: Atri, req: Request, res: Response):
    """
    This function is called whenever an event is received. An event occurs when user
    performs some action such as click button.
    """
    
    if at.Button1.onClick:
        # get food selected in Dropdown1
        food_item = [item for item in FOODS if item['name'] == at.Dropdown1.custom.selectedValue]
        # add row
        if food_item:
            # add a row to Table
            at.Table1.custom.rows.append(food_item[0])
            # refresh
            at.Table1.custom.rows = at.Table1.custom.rows
            
            # update totals in Table
            totals ={'id': 0, 'name': 'Total'}
            for key in at.Table1.custom.rows[0].keys(): 
                if key not in ['id', 'name']:
                    totals[key] = sum(d[key] for d in at.Table1.custom.rows if d['id']!=0)
            at.Table1.custom.rows[0]=totals
            # refresh
            at.Table1.custom.rows = at.Table1.custom.rows

            # update graph
            today = {"date":(date.today()).strftime("%d/%m")}
            for key in ['calories', 'fat', 'protein', 'carbs']:
                today[key] = totals[key]
            history = at.LineChart1.custom.data 
            history[-1]= today
            at.LineChart1.custom.data = history
  
  