import React from 'react'
import {Container, Logo, LogoutBtn  } from '../index'
import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function Header() {
  const authStatus = useSelector((state)=> state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: "Home",
      slug: "/", 
      active: true 
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
        name: "Signup",
        slug: "/signup",
        active: !authStatus,
    },
    {
        name: "All Posts",
        slug: "/all-posts",
        active: authStatus,
    },
    {
        name: "Add Post",
        slug: "/add-post",
        active: authStatus,
    },
    {
        name: "Profile",
        slug: "/profile",
        active: authStatus,
    }
  ]
  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
            <Logo width='70px'/>
            </Link>
          </div>
    
          <ul className='flex ml-auto'>
            {/* {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                <button 
                 onClick={() => navigate(item.slug)}
                 className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                >{item.name}</button>
              </li>
            ) : null
            )} */}

            {navItems.map((item) =>
                item.active ? (
                    <li key={item.name}>
                        <NavLink
                            to={item.slug}
                            className={({ isActive }) =>
                                `inline-block px-6 py-2 duration-200 rounded-full ${
                                    isActive
                                        ? "bg-blue-400 text-black"
                                        : "hover:bg-blue-100"
                                }`
                            }
                        >
                            {item.name}
                        </NavLink>
                    </li>
                ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn/>
              </li>
            )}

          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header