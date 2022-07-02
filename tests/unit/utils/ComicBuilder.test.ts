import ComicBuilder from '../../../src/utils/ComicBuilder';



test('comic builder successfully creates a comic', () => {
    const comicBuilder = new ComicBuilder();
    comicBuilder.setId('123').setIllustrator('Dude').setIssueNumber('15').setPublisher('Clearing House')
                .setTitle('my comic book').setUserId('hello@me.com').setWriter('Steve Kingy');
    const comic = comicBuilder.build();
    expect(comic?.id).toBe('123');
    expect(comic.illustrator).toBe('Dude');
    expect(comic.issueNumber).toBe('15');
    expect(comic.publisher).toBe('Clearing House');
    expect(comic.title).toBe('my comic book');
    expect(comic.userId).toBe('hello@me.com');
    expect(comic.writer).toBe('Steve Kingy');
});