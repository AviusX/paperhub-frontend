import {Switch, Route, Redirect, useLocation} from 'react-router-dom';
import config from './config';
import Navbar from './components/Navbar/Navbar';
import Footer from "./components/Footer";
import Loading from './components/Loading/Loading';
import IStore from './store/IStore';
import {PermissionLevel} from './enums/PermissionLevel';
import {useAuthCheck} from './hooks/auth';
import React, {useEffect, Suspense} from 'react';
import ReactGA from 'react-ga';
import {useSelector} from 'react-redux';
import {ToastContainer, Flip} from 'react-toastify';
import {AnimatePresence} from 'framer-motion';
import './scss/ReactToastify.scss';
import classes from './App.module.scss';

const Landing = React.lazy(() => import("./screens/Landing/Landing"));
const Browse = React.lazy(() => import("./screens/Browse/Browse"));
const Search = React.lazy(() => import("./screens/Search/Search"));
const Upload = React.lazy(() => import("./screens/Upload/Upload"));
const UserProfile = React.lazy(() => import("./screens/UserProfile/UserProfile"));

ReactGA.initialize(config.ANALYTICS.id);

function App() {
    const location = useLocation();
    const authCheck = useAuthCheck();
    const permissionLevel = useSelector<IStore>(state => state.user.permissionLevel) as number;
    const isAuthenticated = useSelector<IStore>(state => state.user.isAuthenticated) as boolean;
    // Assign this padding on all pages but the landing and upload pages.
    const footerPadding = (location.pathname === '/' || location.pathname === '/upload') ? '' : classes.FooterPadding;

    // We only want to run this useEffect once, not on every render.
    // Therefore, an empty array is necessary. Putting authCheck in the
    // dependency array will run this everytime since useAuthCheck will
    // return a new instance of authCheck function every time. This would
    // send a new request to /auth/check on every render.
    // So, disabling the warning about not including authCheck in the
    // dependency array here is a good idea.

    // eslint-disable-next-line
    useEffect(authCheck, []);

    // Set up google analytics
    useEffect(() => {
        ReactGA.pageview(location.pathname);
    });

    return (
        <section className={`min-h-screen relative ${footerPadding}`}>
            {/* Render the navbar on all pages except the landing page. */}
            {location.pathname !== '/' ? (
                <Navbar/>
            ) : null}

            {/* Render the toast container on every page so that toasts
      can show up anywhere. */}
            <ToastContainer transition={Flip}/>

            <AnimatePresence exitBeforeEnter>
                <Suspense fallback={<Loading/>} key={location.key}>
                    <Switch location={location}>
                        <Route path="/user/:userId" exact>
                            <UserProfile/>
                        </Route>

                        <Route path="/browse" exact>
                            <Browse/>
                        </Route>

                        <Route path="/search" exact>
                            <Search/>
                        </Route>

                        <Route path="/upload" exact>
                            {isAuthenticated && permissionLevel >= PermissionLevel.Creator ? (
                                <Upload/>
                            ) : (
                                <Redirect to="/browse"/>
                            )
                            }
                        </Route>

                        <Route path="/" exact>
                            {isAuthenticated ? (
                                <Redirect to="/browse"/>
                            ) : (
                                <Landing/>
                            )}
                        </Route>
                    </Switch>
                </Suspense>
            </AnimatePresence>

            {/* Show the footer on all pages except the landing and upload pages */}
            {(location.pathname !== '/' && location.pathname !== '/upload') && (
                <Footer/>
            )}
        </section>
    );
}

export default App;
