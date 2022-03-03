import logo from './img/logo-small.png';

function Header () {
    return(
        <div className="header-wrap">
            <div className="logo">
                <img src={logo} alt="logo" />
            </div>
            <div className="header-nav">
                <a href="#">Home</a>
                <a href="#">Long term</a>
                <a href="#">Air pollution</a>
                <a href="#">About</a>
            </div>
        </div>
    )
}

export default Header;