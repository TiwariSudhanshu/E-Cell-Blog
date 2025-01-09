const Footer = () => {
    return (
      <footer className="bg-cover bg-center text-gray-300 py-8" style={{ backgroundImage: 'url(https://www.ecellrgpv.com/assets/img/footer-02.jpg)' }}>
        <div className="container mx-auto flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 p-4">
            <h2 className="text-lg font-semibold mb-4">About Us</h2>
            <p className="text-sm leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              vehicula quam vel quam porttitor ac iaculis elit pulvinar.
            </p>
          </div>
          <div className="w-full md:w-1/3 p-4">
            <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
            <ul>
              <li className="mb-2 hover:text-blue-400">Home</li>
              <li className="mb-2 hover:text-blue-400">About</li>
              <li className="mb-2 hover:text-blue-400">Services</li>
            </ul>
          </div>
          <div className="w-full md:w-1/3 p-4">
            <h2 className="text-lg font-semibold mb-4">Contact</h2>
            <ul>
              <li className="mb-2">Email: contact@example.com</li>
              <li className="mb-2">Phone: +123456789</li>
              <li className="mb-2">Address: 123 Street Name, City</li>
            </ul>
          </div>
        </div>
      </footer>
    );
  };

  export default Footer;