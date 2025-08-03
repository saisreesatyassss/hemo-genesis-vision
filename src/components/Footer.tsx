const Footer = () => {
  const partners = [
    "Blend360 India",
    "Microsoft",
    "SVP India", 
    "Blood Warriors"
  ];

  return (
    <footer className="py-12 px-4 bg-foreground text-background">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-2">HemoGenesis AI</h3>
          <p className="text-background/80 max-w-2xl mx-auto">
            Revolutionizing thalassemia prevention and care through artificial 
            intelligence, genetic innovation, and global partnerships.
          </p>
        </div>
        
        <div className="border-t border-background/20 pt-8">
          <div className="text-center mb-6">
            <p className="text-background/90 font-medium mb-4">
              Proudly developed in partnership with:
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {partners.map((partner, index) => (
                <span 
                  key={index}
                  className="bg-background/10 px-4 py-2 rounded-full border border-background/20 hover:bg-background/20 transition-colors"
                >
                  {partner}
                </span>
              ))}
            </div>
          </div>
          
          <div className="text-center text-background/60 text-sm">
            <p>© 2024 HemoGenesis AI. All rights reserved.</p>
            <p className="mt-1">
              Transforming lives through AI-powered healthcare innovation.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;