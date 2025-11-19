import App from './App.jsx';
import { ExampleBrowser } from './pages/ExampleBrowser.jsx';

export const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <ExampleBrowser />
            }
        ]
    },
];