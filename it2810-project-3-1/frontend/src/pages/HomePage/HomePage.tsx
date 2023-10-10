import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";
import { Parallax } from "react-parallax";
import Cinema from "../../images/cinema.jpg";
import image from "../../images/movie.jpeg";
import s_letter from "../../images/s_letter.png";
import { Link } from "react-router-dom";
import "./HomePage.css";

//HomePage component that renders the home page of the website with a parallax effect
//and a description of the website with editors picks
export function HomePage() {
  return (
    <div>
      <Parallax
        strength={300}
        bgImage={Cinema}
        bgImageAlt="Picture of film and popcorn"
      >
        <div className="content">
          <div className="text-content">
            Welcome to Nextflix
            <br />
            <br />
            Choose what to watch NEXT on Netflix!
          </div>
        </div>
      </Parallax>
      <br />
      <br />
      <div>
        <h1 className="title-name">Editor's pick</h1>
        <h2 className="title-name">Most viewed movies:</h2>
        <div className="cards" aria-label="Nextflix cards">
          <Card className="card" sx={{ width: 270 }} aria-label="Movie">
            <CardMedia
              className="card-picture"
              component="img"
              height="330"
              image="https://www.themoviedb.org/t/p/original/cQGM5k1NtU85n4TUlrOrwijSCcm.jpg"
              alt="movie image"
            />
            <CardContent aria-label="Grown Ups">
              <Typography gutterBottom variant="h5" component="div">
                {"Grown Ups"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {"2010"} <br></br> {"Categories: Comedies"} 
              </Typography>
            </CardContent>
            <CardActions>
              <Link to={"/movies/s28"} className="link2">
              <br></br> 
              <br></br> 
                Learn More
              </Link>
            </CardActions>
          </Card>
          <Card className="card" sx={{ width: 270 }}>
            <CardMedia
              className="card-picture"
              component="img"
              height="330"
              image="https://www.themoviedb.org/t/p/original/lxM6kqilAdpdhqUl2biYp5frUxE.jpg"
              alt="movie image"
            />
            <CardContent aria-label="Jaws">
              <Typography gutterBottom variant="h5" component="div">
                {"Jaws"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {"1975"} <br></br> 
                {"Categories: Action & Adventure, Classic Movies, Dramas"}
              </Typography>
            </CardContent>
            <CardActions>
              <Link to={"/movies/s42"} className="link2">
              <br></br> 
                Learn More
              </Link>
            </CardActions>
          </Card>
          <Card className="card" sx={{ width: 270 }}>
            <CardMedia
              className="card-picture"
              component="img"
              height="330"
              image="https://www.themoviedb.org/t/p/original/8hORwWyXsNqX7eDZPSNN5iVTckF.jpg"
              alt="movie image"
            />
            <CardContent aria-label="Aliens Stole My Body">
              <Typography gutterBottom variant="h5" component="div">
                {"Aliens Stole My Body"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {"2020"} <br></br> 
                {"Categories: Children & Family Movies, Comedies"}
              </Typography>
            </CardContent>
            <CardActions>
              <Link to={"/movies/s925"} className="link2">
              <br></br> 
                Learn More
              </Link>
            </CardActions>
          </Card>
          <Card className="card" sx={{ width: 270 }}>
            <CardMedia
              className="card-picture"
              component="img"
              height="330"
              image="https://www.themoviedb.org/t/p/original/9iBgd9gi9ztWiVcYSG6zl8wDFBN.jpg"
              alt="movie image"
            />
            <CardContent aria-label="Free Willy">
              <Typography gutterBottom variant="h5" component="div">
                {"Free Willy"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {"1993"} <br></br>
                {"Categories: Adventure, Drama, Family"}
              </Typography>
            </CardContent>
            <CardActions>
              <Link to={"/movies/s6799"} className="link2">
              <br></br> 
                Learn More
              </Link>
            </CardActions>
          </Card>
        </div>
        <br />
        <br />
        <br />
        <div>
          <h2 className="title-name">Most viewed series:</h2>
          <div className="cards" aria-label="Nextflix cards">
            <Card className="card" sx={{ width: 270 }} aria-label="Serie">
              <CardMedia
                className="card-picture"
                component="img"
                height="330"
                image="https://www.themoviedb.org/t/p/original/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg"
                alt="movie image"
              />
              <CardContent aria-label="Squid Game">
                <Typography gutterBottom variant="h5" component="div">
                  {"Squid Game"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {"2021"} <br></br>{" "}
                  {
                    "Categories: International TV Shows, TV Dramas, TV Thrillers"
                  }
                </Typography>
              </CardContent>
              <CardActions>
                <Link to={"/series/s34"} className="link2">
                <br></br> 
                  Learn More
                </Link>
              </CardActions>
            </Card>
            <Card className="card" sx={{ width: 270 }}>
              <CardMedia
                className="card-picture"
                component="img"
                height="330"
                image="https://www.themoviedb.org/t/p/original/bkxa5Q3cMml5zIYJ2r1J4poqRMX.jpg"
                alt="movie image"
              />
              <CardContent aria-label="Too Hot To Handle: Latino">
                <Typography gutterBottom variant="h5" component="div">
                  {"Too Hot To Handle: Latino"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {"2021"} <br></br>
                  {"Categories: Reality TV, Romantic TV Shows"}
                </Typography>
              </CardContent>
              <CardActions>
                <Link to={"/series/s71"} className="link2">
                  Learn More
                </Link>
              </CardActions>
            </Card>
            <Card className="card" sx={{ width: 270 }}>
              <CardMedia
                className="card-picture"
                component="img"
                height="330"
                image="https://www.themoviedb.org/t/p/original/lDIXKLKDCGDLum19WrkNwZT60a0.jpg"
                alt="movie image"
              />
              <CardContent aria-label="Cooking With Paris">
                <Typography gutterBottom variant="h5" component="div">
                  {"Cooking With Paris"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {"2021"} <br></br>
                  {"Categories: Reality-TV"}
                </Typography>
              </CardContent>
              <CardActions>
                <Link to={"/series/s313"} className="link2">
                <br></br> 
                <br></br> 
                  Learn More
                </Link>
              </CardActions>
            </Card>
            <Card className="card" sx={{ width: 270 }}>
              <CardMedia
                className="card-picture"
                component="img"
                height="330"
                image="https://www.themoviedb.org/t/p/original/z01Dc0Ly2GmCpLe6Scx4d3dPP1S.jpg"
                alt="movie image"
              />
              <CardContent aria-label="La casa de papel">
                <Typography gutterBottom variant="h5" component="div">
                  {"La casa de papel"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {"2021"} <br></br>{" "}
                  {
                    "Categories: Crime TV Shows, International TV Shows, Spanish-Language TV Shows"
                  }
                </Typography>
              </CardContent>
              <CardActions>
                <Link to={"/series/s110"} className="link2">
                  Learn More
                </Link>
              </CardActions>
            </Card>
          </div>
          <br />
          <br />
        </div>
      </div>
    </div>
  );
}
