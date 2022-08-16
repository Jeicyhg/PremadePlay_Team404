import Carousel from "react-bootstrap/Carousel";

const IntroCarousel = () => {
	return (
		<Carousel>
			<Carousel.Item>
				<img
					className="d-block w-100 Carousel-Image"
					src="..\images\slides\sign-up.jpg"
					alt="Sign up slide"
				/>
				<Carousel.Caption>
					<h3>Sign up</h3>
					<p>
						Sign into our website with google credentials and create a
						customized profile to meet new teammates
					</p>
				</Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item>
				<img
					className="d-block w-100 Carousel-Image"
					src="..\images\slides\search.jpg"
					alt="Search Slide"
				/>
				<Carousel.Caption>
					<h3>Search</h3>
					<p>
						Find the exact type of player that matches your needs with our
						extensive search criteria and filters
					</p>
				</Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item>
				<img
					className="d-block w-100 Carousel-Image"
					src="..\images\slides\play.jpg"
					alt="Message and play slide"
				/>
				<Carousel.Caption>
					<h3>Connect and play</h3>
					<p>
						Message and make friends with players across our community and get
						ready to play and rank up
					</p>
				</Carousel.Caption>
			</Carousel.Item>
		</Carousel>
	);
};

export default IntroCarousel;
