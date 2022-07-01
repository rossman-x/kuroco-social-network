beforeEach(() => {
  cy.visit("http://localhost:8787/login");
  cy.contains("Login to your account");
  cy.get("input[data-testid=email-input]").type("test@test.com");
  cy.get("input[data-testid=password-input]").type("123qwe123qwe");
  cy.get("button[class*='login-form-submit']").click();
  cy.url().should("eq", "http://localhost:8787/news");
});
it("All posts displays correctly", () => {
  cy.get("[data-testid=app-header-main]").contains("Member");
  cy.get("[data-testid=app-header-main]").contains("Test User");
  cy.get("img[alt='Avatar']").should("have.attr", "src");
});
it("Can create a new post with all details", () => {
  cy.window().then((win) => {
    const rand = Date.now();

    cy.get("[data-testid=new-post-component]").should("exist");
    cy.get("img[alt='New Post Avatar']").should("have.attr", "src");
    cy.get("input[placeholder='Insert the title']").should(
      "have.attr",
      "type",
      "text"
    );
    cy.get("textarea[placeholder='Share your thoughts...']").should("exist");
    cy.get("img[alt=Post]").should("not.exist");
    cy.get(`[data-testid="Add a tag"]`).should("exist");
    cy.get(`[data-testid="Add an image"]`).should("exist");
    cy.get('[data-testid="Share on the network"]').should("exist");
    cy.get(`[data-testid="new post image"]`).should("not.exist");
    cy.get(`[data-testid="new-post-file-upload"]`)
      .should("exist")
      .and("have.attr", "type", "file")
      .and("not.be.visible");
    cy.get("input[placeholder='Insert the title']").type(`TITLE ${rand}`);
    cy.get("textarea[placeholder='Share your thoughts...']").type(
      `CONTENT ${rand}`
    );

    const tags = [`HT_${rand}`, `HT_${rand}_2`, `HT_${rand}_3`];
    cy.stub(win, "prompt").callsFake(() => tags.pop());
    cy.get(`[data-testid="Add a tag"]`).click();
    cy.get(`[data-testid="Add a tag"]`).click();
    cy.get(`[data-testid="Add a tag"]`).click();
    for (const tag of tags) {
      cy.get(`[data-testid="${tag}"]`).should("exist");
      cy.get(`[data-testid="delete ${tag}"]`).should("exist");
    }
    cy.get(`[data-testid="delete ${tags[0]}"]`).click();
    cy.get(`[data-testid="${tags[0]}"]`).should("not.exist");
    cy.get(`[data-testid="Add an image"]`).click();
    cy.get(`[data-testid="new-post-file-upload"]`)
      .invoke("attr", "style", "display: visible")
      .selectFile("cypress/fixtures/image.png");
    cy.get(`[data-testid="new post image"]`)
      .should("exist")
      .and("have.attr", "src");
    cy.get('[data-testid="Share on the network"]').click();
    cy.wait(5000);
    cy.url().should("include", "/news");
    cy.contains(`TITLE ${rand}`);
    cy.contains(`CONTENT ${rand}`);
    cy.contains(`CONTENT ${rand}`).click();
    cy.url().should("include", "/news/");
    cy.contains(`TITLE ${rand}`);
    cy.contains(`CONTENT ${rand}`);
    cy.get(".inline-flex > .rounded-full").should("have.text", "0");
    cy.get(".inline-flex > .w-8").click();
    cy.wait(500);
    cy.get(".inline-flex > .rounded-full").should("have.text", "1");
    cy.get(".inline-flex > .w-8").click();
    cy.wait(500);
    cy.get(".inline-flex > .rounded-full").should("have.text", "0");
    cy.get("#comment").type(`COMMENT ${rand}`);
    cy.get("[src='/build/_assets/send-icon-7GDCHACG.png']").click();
    cy.wait(500);
    cy.get(".post-body > :nth-child(5)").contains(`COMMENT ${rand}`);
    cy.get("[data-testid='delete-comment']").click();
    cy.get(".post-body > :nth-child(5)").should("not.contain", `COMMENT ${rand}`);
    cy.get("[data-testid='delete_post']").click();
    cy.wait(1000);
    cy.url().should("include", "/news");
    cy.should("not.contain",`TITLE ${rand}`);
    cy.should("not.contain",`CONTENT ${rand}`);
  });
});

/* 
{api_internal
        var=xxx
        status_var='status'
        endpoint="/rcms-api/3/posts/list"
        method='GET'
        direct=1
}
    {assign_array var=data values=""}
{assign var=data value=$json}
{foreach from=$data.list key=k item=foo}
    {assign var=post_id value=$foo.topics_id}
    {api_internal
        var=k_post
        status_var='status'
        endpoint="/rcms-api/3/posts/`$post_id`"
        method='GET'
        direct=1
    }
    {assign var=data.list.$k value=$k_post}
{/foreach}
*/
