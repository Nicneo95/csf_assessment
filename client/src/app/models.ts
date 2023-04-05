export interface Review {
    display_title: string 
    mpaa_rating: string 
    byline: string 
    headline: string
    summary_short: string 
    link_url: string
    multimedia_src: string 
}

export interface Comment {
    id: string
    name: string
    rating: string
    comment: string
}