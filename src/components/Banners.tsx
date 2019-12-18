import React from "react";
import { css, cx } from "emotion";
import { BookCount } from "./BookCount";
import { Breadcrumbs } from "./Breadcrumbs";
import { IFilter } from "../IFilter";
import { useGetLanguageInfo } from "../connection/LibraryQueryHooks";

export const BannerContents: React.FunctionComponent<{
    title: string;
    about: string;
    bookCountMessage: string;
    filter: IFilter;
}> = props => {
    const lines = props.title.split("/");
    console.assert(
        lines.length < 3,
        "display code only supports one '/' in the title"
    );
    const secondLine = lines.length > 1 ? <div> {lines[1]}</div> : "";
    return (
        <>
            <Breadcrumbs />
            <h1
                className={css`
                    font-size: ${lines.length > 1 ? 36 : 72}px;
                    margin-top: 0;
                    //flex-grow: 1; // push the rest to the bottom
                `}
            >
                {lines[0]}
                {secondLine}
            </h1>
            <div
                className={css`
                    font-size: 24px;
                    font-weight: normal;
                    max-width: 600px;
                    margin-bottom: 10px;
                `}
            >
                {props.about}
                {props.filter.language && (
                    <>
                        {props.filter.language.length === 3 && (
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={`https://www.ethnologue.com/language/${props.filter.language}`}
                            >
                                Ethnologue
                            </a>
                        )}
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={`https://en.wikipedia.org/w/index.php?title=ISO_639:${props.filter.language}&redirect=yes`}
                        >
                            Wikipedia
                        </a>
                    </>
                )}
                <br />
                <br />
                <BookCount
                    message={props.bookCountMessage}
                    filter={props.filter}
                />
            </div>
        </>
    );
};

export const HomeBanner: React.FunctionComponent<{
    filter: IFilter;
}> = props => (
    <div
        className={cx([
            "banner",
            // TODO: move this image into this code base and reference as a local asset
            css`
                background-image: url("https://bloomlibrary.org/assets/huyagirls.jpg");
                background-position: left;
                background-blend-mode: darken;
                background-color: rgba(0, 0, 0, 0.6); // fade the image to black
            `
        ])}
    >
        <BannerContents
            title="Library Home"
            about="Welcome to our Crowd Sourced library of free books that you can read, print, or adapt into your own language."
            bookCountMessage="We currently have {0} books."
            filter={props.filter} // all books in circulation
        />
    </div>
);

export const LanguageBanner: React.FunctionComponent<{
    title: string;
    filter: IFilter;
}> = props => {
    const queryLanguageInfo = useGetLanguageInfo(props.filter.language!);
    let imageUrl = null;
    if (queryLanguageInfo && queryLanguageInfo.response) {
        imageUrl =
            queryLanguageInfo.response["data"]["results"][0].bannerImageUrl;
    }
    // enhance: need to do something nice about the transition where we are waiting to find out if there is a custom image
    // enhance: need to factor out this custom image stuff as we also need it for all feature and tag-oriented pages (projects, topics)
    const backgroundStyle = imageUrl
        ? css`
              background-blend-mode: darken;
              background-color: gray;
          `
        : css`
              background-blend-mode: multiply;
              background-color: rgb(128, 0, 128);
          `;
    return (
        <div
            className={cx([
                "banner",
                css({
                    backgroundImage: `url(${imageUrl || "book-pages.jpg"})`,
                    backgroundPosition: "left",
                    backgroundSize: "cover"
                }),
                backgroundStyle
            ])}
        >
            <BannerContents
                title={`${props.title}`}
                about="" // enhance: get text about the language from the database
                bookCountMessage="{0} books"
                filter={props.filter}
            />
        </div>
    );
};

export const ProjectBanner: React.FunctionComponent<{
    title: string;
    filter: IFilter;
}> = props => (
    <div
        className={cx([
            "banner",
            css({ backgroundImage: `url(generic-workshop.jpg)` }),
            css`
                background-position: left;
                background-blend-mode: saturation;
                background-color: rgb(70, 138, 150);
            `
        ])}
    >
        <BannerContents
            title={`${props.title}`}
            about="" // enhance: get text about the language from the database
            bookCountMessage="{0} books"
            filter={props.filter}
        />
    </div>
);

export const SearchBanner: React.FunctionComponent<{
    filter: IFilter;
}> = props => {
    return (
        <div
            className={css`
                background-color: #1c1c1c;
                color: whitesmoke;
                padding-bottom: 10px;
                padding-left: 20px;
            `}
        >
            <Breadcrumbs />
            <BookCount filter={props.filter} />
        </div>
    );
};