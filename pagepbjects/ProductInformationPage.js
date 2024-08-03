class ProductInformationPage{
    constructor(page) {
        this.page = page;
        this.productInfo = page.locator('.product-shop');
        this.productTitle = this.productInfo.locator('div .productName');
        this.productPrice = this.productInfo.locator('.price');
        this.productReviews = this.productInfo.locator('p.rating-links').nth(1);
        this.addYourReviewBtn = this.productInfo.locator('p.rating-links').nth(2);
        this.productAvailability = this.productInfo.locator('.availability');
        this.productShortDescription = this.productInfo.locator('div.std');
        this.qty = page.locator('#qty');
        this.addToCartBtn = page.getByRole('button', {name: 'Add to Cart'});
        this.descriptionBtn = page.getByText('Description');
        this.descriptionText = page.locator('tab-content div.std');
        this.reviewsSection = page.getByText('Reviews');
        this.reviewsDT = page.locator('dt');
        this.reviewsDD = page.locator('dd');

        // review form
        this.productQuality = page.locator('input[type="radio"]');
        this.reviewText = page.locator('#review_field');
        this.reviewSummary = page.locator('#summary_field');
        this.nickName = page.locator('#nickname_field');
        this.submitReviewBtn = page.getByRole('button', {name: 'Submit Review'});
    }

    async getProductTitle() {
       return await this.productTitle.textContent();
    }

    async getProductPrice() {
        let price = await this.productPrice.textContent();
        return await Number(price.slice(1));
    }

    async getProductReviewsNum(){
        let tokens = await this.productReviews.textContent().split('');
        let reviewsNum = Number(tokens[0]);
        return reviewsNum;
    }

    async clickOnAddYourReviewBtn() {
        await this.addYourReviewBtn.click();
    }

    async getProductAvailability() {
        return await this.productAvailability.textContent();
    }


}