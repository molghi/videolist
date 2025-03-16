import './styles/Header.css';
import Search from './Search';

// ================================================================================================

function Header() {
    return (
        <header className="header">
            <div className="container">
                <div className="header__inner">
                    <div className="header__column">
                        <div className="header__logo">Videolist</div>
                    </div>

                    <div className="header__column">
                        <div className="header__about">A minimalist alternative to YouTube</div>
                    </div>

                    <div className="header__column">
                        <Search />
                    </div>
                </div>
            </div>
        </header>
    );
}

// ================================================================================================

export default Header;
