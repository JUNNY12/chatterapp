import { MarkdownEditor } from ".";

export default function Write(): React.JSX.Element {
    return (
      <section className=" bg-white-100">
            <h1>Write</h1>
            <div className="ms-250px tabletS:ms-0 pt-40">
                
                <MarkdownEditor />
            </div>
      </section>
    );
}
