
# Rdux-toolkit With API

This is a simple  management system built with Next, Redux Toolkit, and Tailwind CSS. It allows you to add, update, and delete user records.

## Features

- Add new users
- Edit existing users
- Delete users
- View a list of users
- Display toast notifications for actions

## Installation


1. Clone the repository:

2. Install dependencies:

    ```sh
    npm install
    ```

    or if you are using yarn:

    ```sh
    yarn install
    ```

3. Start the development server:

    ```sh
    npm run dev
    ```

    or if you are using yarn:

    ```sh
    yarn dev
    ```
## Usage

After starting the development server, you can open your browser and navigate to `http://localhost:3000` to view the application.

### Adding an User's

1. Fill in the `Name`, `Email`, and `Username` fields in the form on the left side.
2. Click the `Add Employee` button.
3. A toast notification will appear on the right side confirming the action.

### Editing an Employee

1. Click the `Edit` button next to the employee you wish to edit.
2. Update the `Name`, `Email`, or `Username` fields in the form that appears.
3. Click the `Update Employee` button.
4. A toast notification will appear on the right side confirming the action.

### Deleting an Employee

1. Click the `Delete` button next to the employee you wish to delete.
2. A toast notification will appear on the right side confirming the action.

## API

This project uses the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/) for fetching, adding, updating, and deleting employee data.

### Endpoints

- **GET** `/users` - Fetch all employees
- **POST** `/users` - Add a new employee
- **PUT** `/users/:id` - Update an existing employee
- **DELETE** `/users/:id` - Delete an employee

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some feature'`)
5. Push to the branch (`git push origin feature-branch`)
6. Open a pull request
