Canvas Boilerplate is the go-to solution for quickly creating modern canvas pieces using ES6 and webpack.

## Getting Started

1.  Clone the repo

2.  Install dependencies:

        yarn

    or

        npm install

3.  Run webpack:

        npm start

Your canvas piece should open up automatically at http://localhost:3000 and you should see 'HTML CANVAS BOILERPLATE' on hover.

4.  If you see this Error : 
	
	Error: error:0308010C:digital envelope routines::unsupported

    then :
    
    	 For Linux/macOS: Run this command in your terminal:

		export NODE_OPTIONS=--openssl-legacy-provider
	
	or
	
	For Windows (Command Prompt):

		set NODE_OPTIONS=--openssl-legacy-provider
