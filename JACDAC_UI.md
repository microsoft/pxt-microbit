# Jacdac UI experiment

We will add an experiment to MakeCode for the microbit to prototype a simplified integration of Jacdac (JD)
into MakeCode. 

## High level design

We will separate simulators and device twins into separate views, both using
the pane that hosts the simulators. A switch at the top of the pane will become available
when Jacdac packets are detected over WebUSB. The switch will allow the user to toggle
between the simulator and device twin views. 

The simulators (virtual mbit and JD modules)  will operate on their own JD virtual bus, 
separated from the JD bus over WebUSB used to communicate with a 
physical mbit and JD modules.  This obviates the need for a `proxy mode` 
as it is not possible to have both virtual and physical mbit on the same JD bus.

### Jacdac Clients and Simulators

Simulators will be created automatically based on what JD clients the user's program creates.
There will be no `Add Simulator` or `Add Blocks` button provided.  We assume that a Jacdac extension
has been loaded with the needed JD clients (later, may be built into MakeCode target). Also, as 
simulators are currently created based on dynamic instantiation of Jacdac clients, we want all
Jacdac clients to be created upon program startup (rather than being created conditionally). 


### Jacdac roles

A JD client will specify a role name and a JD service (think of this as the type given to the role
name). Role names must be globally unique. Mechanisms for enforcing this are discussed later. 
After running the user program in the simulator, the set of (role-name, JD-service) pairs is
defined by the set of allocated JD clients.