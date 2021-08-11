import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import { LoginScreen } from '../components/auth/LoginScreen';
import { RegisterScreen } from '../components/auth/RegisterScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';

export const AppRouter = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/login"
                        exact
                        component={LoginScreen}>
                    </Route>
                    <Route path="/register"
                        exact
                        component={RegisterScreen}>
                    </Route>
                    <Route path="/"
                        exact
                        component={CalendarScreen}>
                    </Route>

                    <Redirect to = "/"/>
                </Switch>
            </div>
        </Router>
    );

}
