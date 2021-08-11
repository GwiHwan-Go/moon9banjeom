import sys, csv

def algorithm(userId, likes):
    ## input type 
    ## userId : Int, likes : str of photoId that user liked(..,..,..,)
    lines = [f'User{userId}']+likes.split(',')
    print(lines)
    with open('./photos/filterPhoto/recommended.csv', 'w', encoding='UTF8', newline='') as f :
        writer=csv.writer(f)
        writer.writerow(lines)

if __name__ == "__main__":
    userId = int(sys.argv[1])
    likes = sys.argv[2]
    algorithm(userId, likes)

