# MMM-Xdg-Open

Module for [MagicMirror](https://github.com/MichMich/MagicMirror/) that emulates XDG-OPEN with the help of [npmjs open package](https://www.npmjs.com/package/open), but opening files/links is done via a `XDG-OPEN` notification sent via the [Magic Mirror Notification Mechanism](https://github.com/michMich/MagicMirror/wiki/notifications).

**Any issues, please report and pull requests are most welcome**

## Installation

Open up your terminal, navigate to `/path/to/MagicMirror/modules`. Then type in:

    git clone https://github.com/cybex-dev/MMM-Xdg-Open
    cd MMM-Xdg-Open
    npm install

## Configuration

Here is an example configuration with description. Put it in the `MagicMirror/config/config.js` file:

    {
        module: "MMM-Xdg-Open",
        hidden: true,
    }

*since the module assist with functionality and does not display any information, we are hiding the module with `hidden`*

### XDG-Open Functionality

A notification `XDG-OPEN` is received by this module via the [Magic Mirror Notification Mechanism](https://github.com/michMich/MagicMirror/wiki/notifications). This notification has a payload as follows:

    {
        protocol: "",
        location: "",
        port: "",
        type: "",
    } 

The payload descriptions/purpose is as follows

| Option             | Description
| ------------------ | -----------
| `protocol`         | Protocol the resource uses, such as `SMB`, `SSH`, `RTP`, `HTTP`, etc. See [IANA register](https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml) for more information.
| `location`         | The address of the resource, if it is a directory, the directory is specified here, else if it is an IP address (IPv4/6), the full address is specified here along with the port option.
| `port`             | Port the resource is found at. If the resource is a file, then the port is ignored.
| `type`             | Type as defined in Avahi Service Types the first part of the service type e.g. the `_ssh` part of the full service name `_ssh._tcp`. The type name in this case will be `ssh` (without the underscore).  

*See the [Avahi Documentation](https://linux.die.net/man/5/avahi.service) and the [Arch Wiki](https://wiki.archlinux.org/index.php/Avahi) for information about Avahi operations and naming conventions, and the [IANA register](https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml) for service names and their corresponding ports.* 

## Collaborate

Pull requests are welcome.

## Future Work

N/A
