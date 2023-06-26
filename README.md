 <h1 align="center" style="border-bottom: 1px solid gray;">Chatter</h1>

<p align='center'>
Chatter is a multi-functional platform designed for text-based content, catering to the needs of traditional bookworms and readers who prefer engaging with written content. It aims to provide an alternative to picture-based platforms, offering a space for authors and readers to create and access their own content
</p>

<h2 align='center'>
<a href='https://chattermd.vercel.app/' > Demo</a>
</h2>

<h2 style="border-bottom: 1px solid gray;">Table of Contents</h2>
<ul>
    <li><a href="#overview">Overview</a></li>
    <li><a href="#features">Features</a></li>
    <li><a href='#technologies'>Technologies Used</a></li>
    <li><a href ='#gettingStarted'>Getting Started</a></li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#usage">Usage</a></li>
     <li><a href="#docs">Documentation</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
</ul>

<h1 id='overview'>Overview</h1>
<img src='https://firebasestorage.googleapis.com/v0/b/chatter-be02c.appspot.com/o/chatterImages%2Fdarkmode.png?alt=media&token=2e42bd64-e18c-4386-b63d-3859de25ef4a' /> <br/> <br />
<img src='https://firebasestorage.googleapis.com/v0/b/chatter-be02c.appspot.com/o/chatterImages%2Flight2.png?alt=media&token=f3e5676b-5938-4471-acf8-264334da3699' /> <br/> <br />
<img src='https://firebasestorage.googleapis.com/v0/b/chatter-be02c.appspot.com/o/chatterImages%2Fwrite.png?alt=media&token=1749f663-3262-4f23-9198-3422030924b1' /> <br/> <br />

<h1 id='features'>Features</h1>
<ol>
    <li>
    User Registration and Authentication: Users can register and create an account on Chatter. The registration process supports Google authentication.
    </li> <br />
    <li>
    Content Creation: Chatter provides a rich text editor that allows users to easily create and publish their own content. Users can write blog posts or any other form of textual content and enhance it by adding images. The content is authored and saved in Markdown format, which is then rendered as HTML when viewed.
    </li> <br />
    <li>
    Content Discovery: Chatter offers a personalized feed based on user interests. This feature helps users discover new content tailored to their preferences. Users can also browse and search for other users' content.
    </li> <br/>
    <li>
    Analytics: Chatter provides detailed analytics for users to track their content's performance. Users can view the number of views, likes, comments, and bookmarks their content has received, empowering them to gauge audience engagement.
    </li>
</ol>

<h1 id='technologies'>Technologies Used</h1>
<li>Vite + React</li>
<li>Tailwind CSS</li> 
<li>Firebase (Backend)</li>  <br />





<h1 id='gettingStarted'>Getting Started</h1>

<p>
Follow the instructions below to get a local instance of Chatter up and running on your machine.
</p>

<p>
To clone and run this application, you'll need <a href='https://git-scm.com/'>Git</a> and <a href='https://nodejs.org/en/download/'>Node Js</a> (which comes with <a href='http://npmjs.com/'>npm</a>) installed on your computer. From your command line:
</p>

<h1 id='installation'>Installation</h1>

```
## Clone the repository:
$ git clone https://github.com/your-username/chatterapp.git

Navigate to the project directory:
$ cd chatterapp

# Install dependencies
$ npm install

```

<h1 id='usage'>Usage</h1>

<ol>
    <li>
        Configure Firebase:
    </li>
    <ul>
        <li>
          Set up a Firebase project on the <a href='https://console.firebase.google.com/'>Firebase Console </a>.
        </li>
        <li>
        Obtain your Firebase configuration details (API key, auth domain, project ID, etc.).
        </li>
        <li>
        Create a .env file in the project root directory and add your Firebase configuration details using the format specified in .env.example
        </li>
    </ul>
    <li>
         Start the development server: npm run dev
    </li>
    <li>
        Open your browser and visit http://localhost:5173 to access Chatter.
    </li>
</ol>

<h1 id='docs'>Documentation</h1>

<h2>
<a href="https://docs.google.com/document/d/1BIoyy2xRIAh88UoNErbAujZ4ZNCdhKgnP9jpHVcSICA/edit?usp=sharing">Read Documentation</a>
</h2> <br>


<h1 id='contributing'>Contributing</h1>

<p>
Contributions to Chatter are welcome! If you'd like to contribute, please follow these steps:
</p>

```
## Fork the repository.

Create a new branch:
 $ git checkout -b my-new-feature

Make your changes and commit them: 
$ git commit -am 'Add some feature'

Push to the branch:
$ git push origin my-new-feature

Submit a pull request detailing your changes.
```
<h1 id='license'>License</h1>

This project is licensed under the [MIT LICENSE](LICENSE).

