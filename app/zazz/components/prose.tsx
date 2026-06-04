const html = /* html */ `
    <!-- Prose START -->
    <article class="prose">
        <hgroup>
            <span class="text-eyebrow">Heading 1</span>
            <h1>How vexingly quick daft zebras jump.</h1>
            <p class="text-lg text-muted-foreground">The Art of Typography</p>
        </hgroup>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor.</p>
        
        <hgroup>
            <h2>How vexingly quick daft zebras jump.</h2>
        </hgroup>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor.</p>
        
        <hgroup>
            <h3>How vexingly quick daft zebras jump.</h3>
        </hgroup>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor.</p>
        
        <hgroup>
            <h4>How vexingly quick daft zebras jump.</h4>
        </hgroup>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor.</p>
        
        <hgroup>
            <h5>How vexingly quick daft zebras jump.</h5>
        </hgroup>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor.</p>
        
        <hgroup>
            <h6>How vexingly quick daft zebras jump.</h6>
        </hgroup>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor.</p>

        <hr />

        <figure class="gap-xs">
            <img src="https://placehold.co/800x400" alt="Placeholder demonstrating figure and image styling within prose" />
            <figcaption>Figure 1: A placeholder image styled with .prose</figcaption>
        </figure>
    </article>
    <!-- Prose END -->
`;

export function Prose() {
  return <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: html }} />;
}