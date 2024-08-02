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

    }
}