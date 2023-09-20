import os

import streamlit as st  
import pandas as pd

import streamlit.components.v1 as components

# Create a _RELEASE constant. We'll set this to False while we're developing
# the component, and True when we're ready to package and distribute it.
_RELEASE = False
if not _RELEASE:
    _retail_plan_table = components.declare_component(
        "retail_plan_table",
        url="http://localhost:3001",
    )
else:
    parent_dir = os.path.dirname(os.path.abspath(__file__))
    build_dir = os.path.join(parent_dir, "frontend/build")
    _retail_plan_table = components.declare_component("retail_plan_table", path=build_dir)


def retail_plan_table(key=None,data=None,shape=None,timeframe=None):
    return _retail_plan_table(key=key, data=data ,shape=shape,timeframe=timeframe)

def are_dicts_equal(dict1, dict2):
    # Check if both dictionaries have the same keys
    if type(dict2) != dict:
        return False
    if set(dict1.keys()) != set(dict2.keys()):
        return False
    
    # Check if the values for each key are equal
    for key in dict1:
        if dict1[key] != dict2[key]:
            return False
    return True

# Test code to play with the component while it's in development.
# During development, we can run this just as we would any other Streamlit
# app: `$ streamlit run custom_dataframe/__init__.py`
if not _RELEASE:
    shape = {
        "width": "100%",
        "height": "300px"
    }
    data={'Category': ['White Tag', 'Retail Multiple', 'Price', 'Multiple', 'Take Rate', 'Discount vs EDV', 'Effective Retail', 'Volume / Event (Cases)', 'Event Frequency (Wks)', 'Invoice', 'Allowances (All/Promo)', 'Trade Allowance per case', 'Other', 'Net Invoice Cost', 'Net Cost (Unit)', 'Invoice Cost @ 100% Take Rate', 'Customer Margin ($/Unit)', 'Customer Margin %'], 'edv': [2.99, 0, 0, '', 0, '', 2.99, 0, 52, 20.64, '', 0, 0, 20.64, 1.72, 20.64, 1.2700000000000002, '42.47%'], 'P1_A': [2.99, 0, 0, '', 0, '0.00%', 2.99, 0, 0, 20.64, '', 0, 0, 20.64, 1.72, 20.64, 1.2700000000000002, '42.47%'], 'P1_B': [2.99, 0, 0, '', 0, '0.00%', 2.99, 0, 0, 20.64, '', 0, 0, 20.64, 1.72, 20.64, 1.2700000000000002, '42.47%'], 'P1_C': [2.99, 0, 0, '', 0, '0.00%', 2.99, 0, 0, 20.64, '', 0, 0, 20.64, 1.72, 20.64, 1.2700000000000002, '42.47%'], 'P1_D': [2.99, 0, 0, '', 0, '0.00%', 2.99, 0, 0, 20.64, '', 0, 0, 20.64, 1.72, 20.64, 1.2700000000000002, '42.47%'], 'P2_A': [2.99, 0, 0, '', 0, '0.00%', 2.99, 0, 0, 20.64, '', 0, 0, 20.64, 1.72, 20.64, 1.2700000000000002, '42.47%'], 'P2_B': [2.99, 0, 0, '', 0, '0.00%', 2.99, 0, 0, 20.64, '', 0, 0, 20.64, 1.72, 20.64, 1.2700000000000002, '42.47%'], 'P2_C': [2.99, 0, 0, '', 0, '0.00%', 2.99, 0, 0, 20.64, '', 0, 0, 20.64, 1.72, 20.64, 1.2700000000000002, '42.47%'], 'P2_D': [2.99, 0, 0, '', 0, '0.00%', 2.99, 0, 0, 20.64, '', 0, 0, 20.64, 1.72, 20.64, 1.2700000000000002, '42.47%'], 'Holiday': [2.99, 0, 0, '', 0, '0.00%', 2.99, 0, 0, 20.64, '', 0, 0, 20.64, 1.72, 20.64, 1.2700000000000002, '42.47%'], 'Total': ['', '', '', '', '', '', 0, 0, 52, '', '', 0, 0, 0, 0, 0, '', '0.00%']}
    message=""
    timeframe="Q4"
    if "data" not in st.session_state:
        st.session_state.data=data
    if "message" not in st.session_state:
        st.session_state.message=message
    df = retail_plan_table(data=st.session_state.data,shape= shape,timeframe=timeframe)
    st.write(df)
    if "condition" not in st.session_state:
        st.session_state.condition=df
    if df != None and not are_dicts_equal(df,st.session_state.condition):
        st.write(df)
        data =[]
        st.session_state.condition=df
        st.session_state.data=data
        st.session_state.message="scenario is updated/created"
        st.experimental_rerun()
   