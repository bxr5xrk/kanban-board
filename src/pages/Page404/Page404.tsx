import React from "react";
import { Link } from "react-router-dom";
import st from "./Page404.module.scss";

const Page404 = () => {
    document.title = "404";

    return (
        <div className={st.notFound}>
            <h1>404</h1>
            <h2>Дана сторінка відсутня. :(</h2>
            <Link to="/">
                <button>Перейти на головну</button>
            </Link>
        </div>
    );
};

export default Page404;
