import { BsArrowUpRight, BsGithub } from "react-icons/bs"
import { ImNpm } from "react-icons/im";

import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="flex px-6 md:px-12 lg:px-16 xl:px-20 items-center justify-between  py-6 shadow border-b-2 text-gray-500">
            <div className="flex items-center gap-3 text-sm">
                <h2 className="font-semiboild ">React-swift-reveal examples</h2>
                <Link to={"https://github.com/Mutesa-Cedric/react-swift-reveal/tree/main/apps/examples"} rel={"noreferrer"} target="_blank" >
                    <button className="flex items-center p-2 text-sm text-white bg-blue-500 hover:bg-blue-400 rounded-md gap-2">
                        <span>view source code</span>
                        <BsArrowUpRight className="text-lg" />
                    </button>
                </Link>
            </div>
            <div className="flex items-center gap-3">
                <Link to={'https://github.com/Mutesa-Cedric/react-swift-reveal'} rel="noreferrer" target="_blank">
                    <BsGithub className="text-2xl hover:text-blue-500" />
                </Link>
                <Link to={'https://www.npmjs.com/package/react-swift-reveal'} rel="noreferrer" target="_blank">
                    <ImNpm className="text-2xl hover:text-blue-500" />
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;
