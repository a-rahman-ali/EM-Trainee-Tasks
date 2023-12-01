export interface IMovie{
    title: string;
    poster: string;
    isVoted: boolean;
}

export const defaultMovies: IMovie[] = [
    {
        title: "Hulk (2003)",
        poster: "https://static1.cbrimages.com/wordpress/wp-content/uploads/2018/09/Hulk-2003.jpg?q=50&fit=crop&w=943&dpr=1.5",
        isVoted: false
    },
    {
        title: "DAREDEVIL",
        poster: "https://static1.cbrimages.com/wordpress/wp-content/uploads/2018/09/Daredevil.jpg?q=50&fit=crop&w=943&dpr=1.5",
        isVoted: false
    },
    {
        title: "THE INHUMANS",
        poster: "https://static1.cbrimages.com/wordpress/wp-content/uploads/2018/09/Inhumans.jpeg",
        isVoted: false
    },
    {
        title: "Thor (2011)",
        poster: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2020/11/Thor-2011.jpg?q=50&fit=crop&w=943&dpr=1.5",
        isVoted: false
    }
];