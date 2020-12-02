import Link from "next/link"

const Navbar = () => {
  return (
    <ul>
      <li>
        <Link href="/drugsearchform">
          <button>DRUG_SEARCH</button>
        </Link>
      </li>
      <li>
        <Link href="/membersearchform">
          <button>MEMBER_SEARCH</button>
        </Link>
      </li>
    </ul>
  )
}

export default Navbar
