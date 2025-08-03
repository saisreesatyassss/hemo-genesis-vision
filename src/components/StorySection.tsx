const StorySection = () => {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            A Story That Changed Everything
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
        </div>
        
        <div className="prose prose-lg mx-auto text-foreground leading-relaxed">
          <p className="text-xl mb-8 text-center italic text-muted-foreground">
            "In that moment, watching families struggle with the uncertainty of thalassemia, 
            we knew technology had to be the bridge between hope and healing."
          </p>
          
          <p className="mb-6">
            It was during a routine visit to a thalassemia treatment center that our founders 
            encountered something that would forever change their perspective. Families sat in 
            waiting rooms, their faces etched with worry, not knowing if the right blood would 
            be available for their loved ones. Children, vibrant despite their condition, 
            played while parents whispered prayers for compatible donors.
          </p>
          
          <p className="mb-6">
            The statistics were staggering: millions worldwide affected by thalassemia, 
            countless hours spent searching for compatible blood donors, and families making 
            life-altering decisions with limited genetic information. But what struck our 
            founders most was not the complexity of the medical challenge—it was the human 
            stories behind every case.
          </p>
          
          <p className="mb-8">
            That encounter sparked a vision: What if artificial intelligence could predict 
            blood compatibility with unprecedented accuracy? What if couples could understand 
            their genetic risks before starting a family? What if we could prevent tomorrow's 
            thalassemia cases while supporting today's patients? This wasn't just about 
            building technology—it was about building hope.
          </p>
          
          <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg">
            <p className="text-lg font-medium text-primary mb-2">Our Mission Was Born</p>
            <p className="text-muted-foreground">
              To transform the landscape of thalassemia care through AI-powered innovation, 
              ensuring no family faces uncertainty alone and every patient receives 
              personalized, predictive healthcare.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;