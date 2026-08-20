# Jacdac UI experiment

We will add an experiment to MakeCode for the microbit to prototype a simplified integration of Jacdac (JD)
into MakeCode. 

## High level design

We will separate simulators and device twins into separate views, both using
the pane that hosts the simulators (left column of MakeCode). A switch at the top of 
the pane will become available when Jacdac packets are detected over WebUSB. The switch 
will allow the user to toggle between the simulator and device twin views.

The simulators (virtual mbit and JD modules) will operate on their own JD virtual bus, 
separated from the JD bus over WebUSB used to communicate with a 
physical mbit and JD modules.  This obviates the need for a `proxy mode` 
as it is not possible to have both virtual and physical mbit on the same JD bus.

## Jacdac Clients and Simulators

Simulators will be created automatically based on what JD clients the user's program creates.
There will be no `Add Simulator` or `Add Blocks` button provided.  We assume that a Jacdac extension
has been loaded with the needed JD clients (later, maybe built into MakeCode target). Also, as 
simulators are currently created based on dynamic instantiation of Jacdac clients, we want all
Jacdac clients to be created upon program startup (rather than being created conditionally). 
This could be enforced via static analysis.

## Jacdac roles

A JD client will specify a role name and a JD service (think of this as the type given to the role
name). Role names must be globally unique. Mechanisms for enforcing this are discussed later. 
After running the user program in the simulator, the set of (role-name, JD-service) pairs is
defined by the set of allocated JD clients. We call this set the `JD configuration`.  It
will be useful to store this configuration locally (it may change upon changes to the program, of
course).

## Device twin view

The device twin view is parameterized by the JD configuration, which defines the set of JD
services that the user's program expects to be available on the JD bus.  The set of
physical modules available on the JD bus may change over time. Initially, it may
be the case that only the physical mbit is on the bus. In any case, the JD configuration
can be used as a guide to prompt the user to attach the needed modules.  The goal is to
have all roles in the JD configuration bound to Jacdac modules. 

The device twin view lists all role names from the configuration and the shows the
JD module bound to that name, if any, as well as the state of the module. This helps
indicate to the user that the module is active on the JD bus.

### re-mapping roles to modules

There may be many mappings possible, especially in the case where there are multiple
roles with the same service. A classic example would be a program that makes use of
four 4 JD buttons (say for left, right, up, and down). The user may want to change
the mapping of the 4 role names to the 4 buttons attached.  The current JD simulator
already has support for re-assigning, though we probably can improve up on. this

### overflow

TBD

## More nitty gritty

- a Jacdac module may implement more than one service, and even have multiple services of 
  the same service class; we have hierarchical naming options in this case. See the 
Role Manager

## Plan

X keep Jacdac buses separate for simulator and devices
  X when in sim, don't accept packets from physical bus
  - when in devices, don't accept packets from sims
X add Jacdac experiment option 
X add switch to top of left-column
X switch between "sims" and "twins"
  X need to revisit the logic here - keep the simdriver intact so 
    as to keep the jacdac sim live, but turn-off/hide ALL the other sims.
X when JD packet found over WebUSB, enable switch
- we want to have all the roles declared at once rather than dealing with
  them one at a time; for now, use a special EndJDClient() method
X change the JD sim to have `sim only` mode
   X no device twins
   X adds simulators automatically
   X no UI for adding simulators/blocks/etc.
- capture the JD configuration after each sim execution
- change the JD sim to have `twin only` mode
   - no simulators
   - `skeleton` twins for roles that have not been bound
   - overflow section for unbound extra modules
- what to do about the editor when in device mode?
   - disable with modal instruction
   - repurpose?
NO should we attempt to have microbit in device twin mode?
   - try to support A/B buttons and LED screen?
   - this would require extra code on the micro:bit to send events
     and we would only use it for twinning... sigh...
   - instead, you can console.log and see it?

ALTERNATIVE UI
   - add "Jacdac Simulator" and "Jacdac Devices" buttons, like with serial
   - create a "Jacdac Editor" to use full space of toolbox and code canvas
   - when in jacdac editor in device mode, disable the microbit sim

BUGS
   - keep order as created by program, - don't change order unless program changes
   - cache the roles, so when we switch to deviceMode, we have them in hand
   X jacdac sims don't all get registered
   ? too many sims are being created (buttons)
