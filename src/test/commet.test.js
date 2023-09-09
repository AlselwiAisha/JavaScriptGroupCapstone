import { commentsCount, itemsCount } from '../modules/count.js';

describe('commentCount', () => {
  test('returns the correct count of comments', () => {
    document.body.innerHTML = `
    <li class="comments">Comment1</li>
    <li class="comments">Comment2</li>
    <li class="comments">Comment3</li>
    <li class="comments">Comment4</li>
    <li class="comments">Comment5</li>
    <li class="comments">Comment6</li>
    <li class="comments">Comment7</li>
    `;
    const count = commentsCount();
    expect(count).toBe(7);
  });

  test('returns 0 when no comments are present', () => {
    document.body.innerHTML = '';
    const count = commentsCount();
    expect(count).toBe(0);
  });
});

describe('response is 5', () => {
  test('item counts', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(
        [
          { item: 'A' },
          { item: 'B' },
          { item: 'C' },
          { item: 'D' },
          { item: 'F' },
        ],
      ),
    }));

    const res = await itemsCount();
    expect(res.length).toBe(5);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test('null response', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(null),
    }));

    const res = await itemsCount();
    expect(res).toBe(null);
  });

  test('empty response', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve([]),
    }));

    const res = await itemsCount();
    expect(res.length).toBe(0); // Check if the res.length is 0
  });
});
