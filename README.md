# Week 3 - Todo App 🚀

## Overview

This project is a Todo App built as part of Week 3 of the DevOps + WebDev Cohort 3.0. The main focus of this assignment was to:

- Learn DOM manipulation techniques.
- Create a mock version of React's Reconciler to understand state management and how React updates the DOM efficiently.

## Features

- **Add Todos:** Users can input and add new todo items to the list.
- **Edit Todos:** Users can edit existing todo items directly in the UI.
- **Delete Todos:** Users can remove todos from the list.
- **State Management:** The app manages a list of todos using a custom state management system, allowing real-time updates to the UI.

## Implementation Details

### DOM Manipulation

The app dynamically creates and updates DOM elements based on the current state of the todo list:

- **Creating Elements:** Each todo item is represented as a div element, containing a p element for the title and buttons for editing and deleting.
- **Updating Elements:** The render() function regenerates the entire todo list whenever there is a change in the state, similar to how React re-renders components.

### Mock Reconciler

- The app mimics React’s Reconciler by managing an array of todo objects (todos[]) and updating the DOM based on this state.
- **State Management:** The todos array acts as the state, and functions like addTodo(), editTodo(), and deleteTodo() modify this state and trigger re-rendering of the DOM.
- **Component Structure:** The createTodoComponent() function is analogous to a React component, building and returning DOM elements based on the current state of a todo item.

### State and State Management

- The app manages state through a simple JavaScript array. State changes trigger the render() function, which updates the DOM to reflect the current state.
- **Real-Time Updates:** The app ensures the DOM is always in sync with the current state, providing an interactive experience similar to how React manages state.

## Reflection

This exercise provided hands-on experience with concepts that are fundamental to React, such as state management and DOM reconciliation. Building this from scratch deepened my understanding of how React efficiently manages UI updates under the hood.

## Getting Started

1. Clone the repository.
2. Open index.html in your browser.
3. Add, edit, and delete todos using the interface.
