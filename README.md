# Toy Robot Simulator

## Demo

Visit the deployed application: [Toy Robot](https://toy-robot-mu.vercel.app/)

## Installation

To set up this project locally, follow these steps:

1. **Clone the Repository**

   First, clone the project repository to your local machine using Git:

   ```bash
   git clone https://github.com/your-username/your-repository-name.git
   cd your-repository-name

   ```

2. **Install**

   ```npm install  or yarn install

   ```

3. **Run the App**

   ```npm run dev  or yarn dev

   ```

## Description

- The application is a simulation of a toy robot moving on a square tabletop, with dimensions 5 units x 5 units.
- There are no other obstructions on the table surface.
- The robot is free to roam around the surface of the table but must be prevented from falling to destruction. Any movement that would result in the robot falling from the table must be prevented; however, further valid movement commands must still be allowed.

## Commands

Create an application that can read in commands of the following form:

- `PLACE X,Y,F`: Places the toy robot on the table in position X,Y and facing NORTH, SOUTH, EAST, or WEST.
- `MOVE`: Moves the toy robot one unit forward in the direction it is currently facing.
- `LEFT` and `RIGHT`: Rotate the robot 90 degrees in the specified direction without changing its position.
- `REPORT`: Announces the X, Y, and F of the robot. This can be in any form, but standard output is sufficient.

### Placement Details

- The origin (0,0) can be considered the SOUTH WEST most corner.
- The first valid command to the robot is a PLACE command. After that, any sequence of commands may be issued, in any order, including another PLACE command. The application should discard all commands in the sequence until a valid PLACE command has been executed.

### Ignoring Commands

- A robot that is not on the table can choose to ignore the MOVE, LEFT, RIGHT, and REPORT commands.
- Input can be from a file or from standard input, as the developer chooses.

## Constraints

- The toy robot must not fall off the table during movement. This includes the initial placement of the toy robot.
- Any move that would cause the robot to fall must be ignored.

## Example Input and Output

### Example a

PLACE 0,0,NORTH
MOVE
REPORT

### Expected output:

0,1,NORTH

### Example b

PLACE 0,0,NORTH
LEFT
REPORT

### Expected output:

0,0,WEST

### Example c

PLACE 1,2,EAST
MOVE
MOVE
LEFT
MOVE
REPORT

### Expected output

3,3,NORTH
