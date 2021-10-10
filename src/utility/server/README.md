# Server utilities

Since Next.js allows you to run code on the server or during the build that cannot be run run in the browser it is necessary to make sure that that this code is not imported and
used by client code. Any utility functions that are cannot be run on the client (e.g. use APIs like `fs`, or `path`) should be placed in this folder and exported/imported directly from here to avoid any client code inadvertently importing it.