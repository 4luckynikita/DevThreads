import "./AboutPage.css"

const AboutPage = () => {
    return <div className="about-container">
        <h1 className="about-container-heading">About</h1>
        <div className="about-inner">
            <img src="https://asset.cloudinary.com/dkxfjbynk/b9807e70c98852986ec1d34229afdd67" className="about-img" />
            <h2>DevThreads was built by Nikita Kastyshyn</h2>
            <a href="mailto:4luckynikita@gmail.com">4luckynikita@gmail.com</a>
            <p className="hello-why-r-u-here">Check out the repo and Nikita's LinkedIn below:</p>
            <div className="about-a-container">
                <a href="https://github.com/4luckynikita/DevThreads" target="_blank" className="about-git-button">GitHub Repo</a>
                <a href="https://www.linkedin.com/in/nikitakastyshyn/" target="_blank" className="about-linkedin-button">LinkedIn</a>
            </div>
        </div>
    </div>
}

export default AboutPage