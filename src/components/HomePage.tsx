import React from "react";
import { BookGroup } from "./BookGroup";
import { LanguageGroup } from "./LanguageGroup";
import { BookshelfGroup } from "./BookShelfGroup";
import { IFilter, InCirculationOptions } from "../IFilter";
import { HomeBanner } from "./banners/HomeBanner";
import { ListOfBookGroups } from "./ListOfBookGroups";
import { FeatureGroup } from "./FeatureGroup";

export const HomePage: React.FunctionComponent = () => {
    const almostAllBooksFilter: IFilter = {
        inCirculation: InCirculationOptions.Yes
    };
    return (
        <>
            <HomeBanner filter={almostAllBooksFilter} />
            <ListOfBookGroups>
                <BookGroup
                    title="Featured Shell Books You Can Translate"
                    filter={{ otherTags: "bookshelf:Featured" }}
                />
                <LanguageGroup />
                <BookGroup
                    title="New Arrivals"
                    filter={{}}
                    order={"-createdAt"}
                />
                <BookshelfGroup
                    title="Publishers"
                    bookShelfCategory="publisher"
                />

                <FeatureGroup title="Book Features" />

                <BookshelfGroup title="Projects" bookShelfCategory="project" />

                <BookshelfGroup
                    title="Organizations & Governments"
                    bookShelfCategory="org"
                />
                <BookGroup title="Math Books" filter={{ topic: "Math" }} />
            </ListOfBookGroups>
        </>
    );
};
