import classes from "./style.module.css";
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import Searchbar from "./components/searchbar/Searchbar";
import axios from "axios";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

const Home = () => {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      const checkAndCreateUser = async () => {
        try {
          const fetchedUser = await axios.get(
            `${import.meta.env.VITE_API_URL}/users/${user.id}`
          );

          // USER DOES NOT EXIST, CREATE NEW USER
          if (!fetchedUser) {
            const userData = {
              userId: user.id,
              email: user.emailAddresses[0].emailAddress,
              userName: user.username,
            };

            const createUser = await axios.post(
              `${import.meta.env.VITE_API_URL}/users/`,
              userData
            );

            if (createUser.status === 200) {
              console.log("User created!");
            } else {
              console.error("Failed to create user");
            }
          } else {
            console.log("User already exists");
          }
        } catch (err) {
          console.error("Error checking or creating user", err);
        }
      };

      checkAndCreateUser();
    }
  }, [user]);

  return (
    <div>
      <Header />
      <main>
        <h1 className={classes.name}>MANGAZINE</h1>
        <h2>Your favorite reads in one place</h2>
        <div className={classes.searchBarContainer}>
          <Searchbar placeholder="Search" />
        </div>
      </main>
      <div className={classes.footerContainer}>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
