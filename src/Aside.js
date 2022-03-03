const Aside = props => {
    const popularPlaces = props.state.popularWeather.map(place => 
        <div key={place.id} className="aside-tile">
            <h1>{place.city}</h1>
            <h2>{place.temperature}°C</h2>
            <p>{place.description}</p>
            </div>
    )
    return (
        <div className="aside-wrap">
            <h1>Popular places</h1>
            {popularPlaces}
        </div>
    )
}

export default Aside;