import logo from "../assets/logo.png";

const Header = () => {
  return (
    <header className="bg-primary text-white py-6">
          <nav className="container mx-auto flex items-center justify-around">
            <a href="#">
              <img src={logo} alt="logo" className="w-64" />
            </a>
            <ul className="flex space-x-6 font-roboto text-lg font-light tracking-wide">
              <li>
                <a href="#" className="text-white hover:text-accent font-roboto">
                  Bank
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-accent">
                  Business
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-accent">
                  Career
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-accent">
                  Contact
                </a>
              </li>
            </ul>
            <input
              type="text"
              placeholder="Search..."
              className="px-5 py-3 rounded-full bg-gray-200 text-gray-700 placeholder-gray-400 focus:outline-none font-poppins"
            />
          </nav>
        </header>

  )
}

export default Header