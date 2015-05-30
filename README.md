# SIIM HACKATHON 2015 PROJECT

This project was created from the angular-seed repo

##Description
[http://siim.org/?page=15hacking_healthcare](SIIM 2015 Hackathon Website)

More description to follow

## Getting Started

To get you started you can simply clone the repository and install the dependencies:

### Prerequisites

You need git to clone the repository.

You must have node.js and the node package manager (npm) installed. You can get them from [http://nodejs.org/](http://nodejs.org/).
We also use a number of node.js tools to initialize and test angular-seed. You must have node.js and
its package manager (npm) installed.

### Install Dependencies

```
npm install
```

Behind the scenes this will also call `bower install`.  You should find that you have two new
folders in your project.

* `node_modules` - contains the npm packages for the tools we need
* `app/bower_components` - contains the angular framework files

*Note that the `bower_components` folder would normally be installed in the root folder but
angular-seed changes this location through the `.bowerrc` file.  Putting it in the app folder makes
it easier to serve the files by a webserver.*

### Run the Application
You will need to run the custom mini CORS proxy to prevent CORS issues
```
node custom_proxy/proxy.js

We have preconfigured the project with a simple development web server.  The simplest way to start
this server is:

```
npm start
```

Now browse to the app at `http://localhost:8000/app`.
