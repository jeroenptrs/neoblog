
# Neoblog documentation

###### City Of Zion dApp Competition Entry
https://app.neoblog.io

February 22, 2018

be-neo/neoblog - Maurice Dalderup & Jeroen Peeters


### Feature overview documentation

##### Overview latest articles
When entering on our website, the latest posts are visible. These are ordered by postdate and can be viewed in detail by clicking on them. When there are more than 5 posts, you are able to use the pagination to navigate through the articles overview.


##### Overview articles per category
When entering on our website, you can click on an article to view its details. Whenever the details are loaded from IPFS (Post content) and the NEO blockchain (User and post management), you should see a section on top with an identicon, username, the category and the date when it was published. When clicking on the category, you are brought over to the overview of all articles regarding the selected category. Overview articles by user


##### Post details page
When entering on our website, you can click on an article to view its details. Whenever the details are loaded from IPFS (Post content) and the NEO blockchain (User and post management), you should see a section on top with an identicon, username, the category and the date when it was published. 
Sign-in with WIF 

##### Sign-in with NEP-2
When entering on our website, you can click on the top right icon to see the login form. This form is smart enough to recognize the type of key you are entering and acts upon. When a NEP-2 key is entered, the password field is required and you can proceed to click the login button.

Also notice the icon changing to an identicon, which is generated based on your public address.
 Managing a user's username 


##### Creating a new post
When entering on our website, you can click on the top right icon to a menu. In this menu you have the option to create a new post.

When clicking the "New post" button, you will be brought to the post editor. This is a markdown editor meaning you can use all annotation used in markdown. A preview is seen on the right side to see how the post will look.

After you are done writing the article you can choose a category for your post. When all this is done, you can now click the submit button. When this is done, the post content will be pushed to IPFS and the post details/index/etc... Will be persisted to the neo blockchain.

Afterwards, you are redirected to the post details page to see your final blog post.

##### Signing out
When entering on our website, you can click on the top right icon to a menu. In this menu you have the option sign out.

All three action can be seen in the images below.

***

### Technical documentation: Smart Contract

The Neoblog smart contract has 3 possible operations:
Submitting posts
Managing user

##### submitPost:
This function requires 3 parameters which are:
* The user his address
* The hash from IPFS (IPFS hash linked to article post)
* The chosen category which the user has chosen

Invoking this function will add an entry to the latest articles, link the post to the user and add the post to the assigned category. This function is the core of our smart contract as it implements our main functionalities.

##### manageUser:
This function requires 3 parameters which are:
* The user his address
* The user his new username
* The user his old username (defaults to “undefined”)

Invoking this function checks the availability of the username and if it is not yet taken, it assigns the username to the user his address. Whenever a user changes his username, the old username is cleared and can be chosen by another user.

***

### Technical documentation: SDK

The goal of the SDK was to create a reusable NPM package which acts as a service layer for our neoblog application.

The SDK has the following functions built-in:
* Constructor: to retrieve an instance of the Neoblog SDK
* getLatest: gets the latest index of article from which the domain passed (latest user post, category post, ….)
* getLatestPost: gets the latest post
* getArticle: gets a post by index
* getUserData: gets the user data from an address
* getAddressFromUserId: gets the address of a user, found by userId
* processAuthentication: processes the login functionality through a WIF or NEP-2 token
* determineKey: gives back the kind of key is passed (WIF or NEP-2)
* addressToScriptHash: converts an address to a script hash
* scriptHashToAddress: converts a script hash to an address
* unhex: unhexilifies a hex string
* deserialize: deserializes posted data on the blockchain (only needed for post.data domain)
* hexToTimeStamp: converts a hex time stamp to a normal time stamp
* getBestRPCNode: retrieves the best RPC node
* getFromGateway: gets an article from IPFS through gateway.

***


### Technical documentation: NEO-HTTPS-Proxy
Our IPFS content is posted through the IPFS Javascript SDK and served back to the client over the IPFS gateway.

Both required our application to be served over HTTPS, and for general security we chose to not implement HTTP content serving.  
But, upon testing our application we noticed that the NEO seeds are served over HTTP, resulting in browsers blocking the production application for Mixed Active Content (which is prohibited).

Localhost is exempted from this procedure.  We wrote a serverless HTTPS proxy that serves specifically as middleware between neon-js and the NEO seeds.
This implementation proxies the HTTP calls over to HTTPS for our application to work properly.

  The code for this implementation can be found through this url: https://github.com/be-neo/neo-https-proxy